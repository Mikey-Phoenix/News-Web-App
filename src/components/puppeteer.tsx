// import { getBrowser } from './browserSingleton'; // your existing singleton pattern

// interface VideoManifestResult {
//   mediaUrls: string[];
// }

// const scrapeVideoManifest = async (url: string): Promise<VideoManifestResult> => {
//   const browser = await getBrowser(); // reuse your singleton instance
//   const page = await browser.newPage();

//   const mediaUrls: string[] = [];

//   // 1. Attach the listener BEFORE navigating
//   page.on('response', (response) => {
//     const responseUrl = response.url();
//     if (
//       responseUrl.includes('.mpd') ||
//       responseUrl.includes('.m3u8') ||
//       responseUrl.includes('/media/')
//     ) {
//       mediaUrls.push(responseUrl);
//     }
//   });

//   try {
//     // 2. THEN navigate — this triggers the network requests the listener above catches
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // 3. Optional: wait a bit longer, since video manifests sometimes
//     // load lazily after the initial page load (e.g. only once the player mounts)
//     await page.waitForTimeout(3000);
//   } finally {
//     // 4. Always clean up the page, even if something throws
//     await page.close();
//   }

//   return { mediaUrls };
// };

// export default scrapeVideoManifest;