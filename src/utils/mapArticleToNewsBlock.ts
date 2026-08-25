import type { ScrapeResult } from '../hooks/useScraper';

interface NewsBlockProps {
  title: string;
  description: string;
  imageUrl: string;
  story: string;
  isHot: boolean;
  isBig: boolean;
  date: string;
  location: string;
}

const formatDate = (rawDate: string | null): string => {
  if (!rawDate) return 'Unknown Date';

  // 👇 if it's a relative time string like "2h" or "2 hours ago", return it directly
  if (/^\d+\s*(h|m|s|hr|min|sec|hour|minute|second)/.test(rawDate)) {
    return rawDate;
  }

  try {
    const parsed = new Date(rawDate);
    if (isNaN(parsed.getTime())) return rawDate; // 👈 if parsing fails, return original
    return parsed.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
    });
  } catch {
    return rawDate;
  }
};

const extractLocation = (url: string): string => {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    return hostname.split('.')[0].replace(/^./, (c) => c.toUpperCase());
  } catch {
    return 'Unknown';
  }
};

// Shared mapper — works for both news and sport articles
export const mapArticleToNewsBlock = (article: ScrapeResult): NewsBlockProps => {
  return {
    title: article.title || 'Untitled Story',
    description: article.description || 'No description available.',
    imageUrl: article.image || 'https://via.placeholder.com/400x200',
    story: article.url,
    isHot: false,
    isBig: true,
    date: article.date ? formatDate(article.date) : 'Unknown Date',
    location: article.tag || extractLocation(article.url),
  };
};

// Shared mapper — works for both news and sport articles
export const mapArticleToVideoBlock = (article: ScrapeResult): NewsBlockProps => {
  return {
    title: article.title || 'Untitled Story',
    description: article.description || 'No description available.',
    imageUrl: article.image || 'https://via.placeholder.com/400x200',
    story: article.url,
    isHot: false,
    isBig: true,
    date: article.date ? formatDate(article.date) : 'Unknown Date',
    location: article.tag || extractLocation(article.url),
  };
};