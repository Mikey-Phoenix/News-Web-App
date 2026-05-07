import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer-core';
import * as cheerio from 'cheerio';



const app = express();
app.use(cors());
app.use(express.json());

interface NewsArticle {
  title: string;
  image: string | null;
  description: string;
  date: string | null;
  tag: string | null;
  url: string;
}

// --- Shared Puppeteer launcher ---
const launchBrowser = () => puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new' as any,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
  ],
});

// --- Shared helper: get page HTML via Puppeteer ---
const getPageHTML = async (url: string): Promise<string> => {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();

    // Override default 60s timeout
    page.setDefaultNavigationTimeout(120000);
    page.setDefaultTimeout(120000);

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    // Block unnecessary resources to speed up page load
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const blocked = ['stylesheet', 'font', 'media'];
      if (blocked.includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    const html = await page.content();
    await browser.close();
    return html;
  } catch (err) {
    await browser.close();
    throw err;
  }
};

// --- Shared helper: extract highest resolution image from srcset or src ---
const getImage = (img: cheerio.Cheerio<any>): string | null => {
  const srcset = img.attr('srcset');
  if (srcset) {
    const urls = srcset
      .split(',')
      .map((s: string) => s.trim().split(' ')[0])
      .filter(Boolean);
    return urls[urls.length - 1] || null;
  }
  return img.attr('src') || null;
};

// -----------------------------------------------------------
// ENDPOINT 1: BBC News — /api/scrape
// Targets: bbc.com/news
// Container: .sc-82b3c53b-0
// -----------------------------------------------------------
app.get('/api/scrape', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    $('.sc-82b3c53b-0').each((_: number, el: any) => {
      const container = $(el);

      const title = clean(container.find('[data-testid="card-headline"]').first().text());
      const description = clean(container.find('p').first().text());
      const href = container.find('[data-testid="internal-link"]').first().attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());
      const date = clean(container.find('[data-testid="card-metadata-lastupdated"]').first().text()) || null;
      const tag = clean(container.find('[data-testid="card-metadata-tag"]').first().text()) || null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No news articles found. BBC may have updated their class names.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('NEWS SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 2: BBC Sport — /api/scrape-sport
// Targets: bbc.com/sport
// Container: [data-testid="promo"]
// -----------------------------------------------------------
app.get('/api/scrape-sport', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com/sport';

    // Using data-testid="promo" as it's more stable than generated class names
    $('[data-testid="promo"]').each((_: number, el: any) => {
      const container = $(el);

      // Title — navigate through the promo headline structure
      const title = clean(
        container.find('.ssrcss-6bmydz-PromoHeadline span[aria-hidden="false"]').first().text()
      );

      // Description — paragraph beneath the title
      const description = clean(
        container.find('.ssrcss-1q0x1qg-Paragraph').first().text()
      );

      // URL — href on the promo link
      const href = container.find('.ssrcss-1xznhic-PromoLink').first().attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

      // Image — sport uses <picture> with <source> tags
      const image = (() => {
        const srcset = container.find('picture source').first().attr('srcset');
        if (srcset) {
          const urls = srcset
            .split(',')
            .map((s: string) => s.trim().split(' ')[0])
            .filter(Boolean);
          return urls[urls.length - 1] || null;
        }
        return container.find('picture img').first().attr('src') || null;
      })();

      // Tag — e.g. "Premier League", "Formula 1"
      const tag = clean(
        container.find('.ssrcss-61mhsj-MetadataText').first().text()
      ) || null;

      // Date — the visually hidden time text e.g. "2 hours ago"
      const date = clean(
        container.find('.visually-hidden').last().text()
      ) || null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No sport articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('SPORT SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 3: BBC Technology — /api/scrape-tech
// Targets: bbc.com/technology
// -----------------------------------------------------------
app.get('/api/scrape-tech', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    $('a[data-testid="internal-link"]:has([data-testid="card-headline"])').each((_: number, el: any) => {
      const container = $(el);

      const href = container.attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;
      const title = clean(container.find('[data-testid="card-headline"]').first().text());
      const description = clean(container.find('[data-testid="card-description"]').first().text());
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());
      const date = clean(container.find('[data-testid="card-metadata-lastupdated"]').first().text()) || null;
      const tag = clean(container.find('[data-testid="card-metadata-tag"]').first().text()) || null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No technology articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('TECH SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------------
// ENDPOINT 4: BBC Health — /api/scrape-health
// Targets: bbc.com/health
// -----------------------------------------------------------
app.get('/api/scrape-health', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    console.log('HTML length:', html.length);
    console.log('internal-link count:', $('[data-testid="internal-link"]').length);
    console.log('card-headline count:', $('[data-testid="card-headline"]').length);

    // Container — anchor tag with data-testid="internal-link" wrapping a dundee-article
    $('a[data-testid="internal-link"]:has([data-testid="card-headline"])').each((_: number, el: any) => {
      const container = $(el);

      // URL — href on the anchor tag itself
      const href = container.attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

      // Title — data-testid="card-headline"
      const title = clean(container.find('[data-testid="card-headline"]').first().text());

      // Description — data-testid="card-description"
      const description = clean(container.find('[data-testid="card-description"]').first().text());

      // Image — img with classes sc-5340b511-0 and hLdNfA
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());

      // Tag and date — not present in this card structure
      const tag: string | null = null;
      const date: string | null = null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No health articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('HEALTH SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-business', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    // Container — data-testid="dundee-card"
    $('[data-testid="dundee-card"]').each((_: number, el: any) => {
      const container = $(el);

      // URL — href on the internal-link anchor inside the card
      const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

      // Title — data-testid="card-headline"
      const title = clean(container.find('[data-testid="card-headline"]').first().text());

      // Description — data-testid="card-description"
      const description = clean(container.find('[data-testid="card-description"]').first().text());

      // Image — img with classes sc-5340b511-0 and hLdNfA
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());

      // Date — data-testid="card-metadata-lastupdated"
      const date = clean(
        container.find('[data-testid="card-metadata-lastupdated"]').first().text()
      ) || null;

      // Tag — data-testid="card-metadata-tag" e.g. "Business", "Health"
      const tag = clean(
        container.find('[data-testid="card-metadata-tag"]').first().text()
      ) || null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No business articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('BUSINESS SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-entertainment', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    // Container — data-testid="dundee-card"
    $('[data-testid="dundee-card"]').each((_: number, el: any) => {
      const container = $(el);

      // URL — href on the internal-link anchor inside the card
      const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

      // Title — data-testid="card-headline"
      const title = clean(container.find('[data-testid="card-headline"]').first().text());

      // Description — data-testid="card-description"
      const description = clean(container.find('[data-testid="card-description"]').first().text());

      // Image — img with classes sc-5340b511-0 and hLdNfA
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());

      // Date — data-testid="card-metadata-lastupdated"
      const date = clean(
        container.find('[data-testid="card-metadata-lastupdated"]').first().text()
      ) || null;

      // Tag — data-testid="card-metadata-tag" e.g. "Business", "Health"
      const tag = clean(
        container.find('[data-testid="card-metadata-tag"]').first().text()
      ) || null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No entertainment articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('ENTERTAINMENT SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/scrape-video', async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const html = await getPageHTML(url);
    const $ = cheerio.load(html);
    const articles: NewsArticle[] = [];
    const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
    const baseUrl = 'https://www.bbc.com';

    // Container — data-testid="edinburgh-card"
    $('[data-testid="edinburgh-card"]').each((_: number, el: any) => {
      const container = $(el);

      // URL — href on the internal-link anchor inside the card
      const href = container.find('a[data-testid="internal-link"]').first().attr('href') || '';
      const articleUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

      // Title — data-testid="card-headline"
      const title = clean(container.find('[data-testid="card-headline"]').first().text());

      // Description — data-testid="card-description"
      const description = clean(container.find('[data-testid="card-description"]').first().text());

      // Image — img with classes sc-5340b511-0 and hLdNfA
      const image = getImage(container.find('img.sc-5340b511-0.hLdNfA').first());

      // Tag — data-testid="card-metadata-tag" e.g. "The Travel Show"
      const tag = clean(
        container.find('[data-testid="card-metadata-tag"]').first().text()
      ) || null;

      // Date — not present in this card type
      const date: string | null = null;

      if (title && articleUrl) {
        articles.push({ title, image, description, date, tag, url: articleUrl });
      }
    });

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No reel articles found.' });
    }

    res.json({ success: true, count: articles.length, data: articles });

  } catch (error: any) {
    console.error('REELS SCRAPE ERROR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Scraper server running on port 4000')); 