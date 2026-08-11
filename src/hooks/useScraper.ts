import { useState,  useCallback, useRef } from 'react';
import axios from 'axios';

export interface ScrapeResult {
  title: string;
  image: string | null;
  description: string;
  date: string | null;
  tag: string | null;
  url: string;
  author?: string | null;
  body?: string | null;
}

export interface NewsArticle {
  title: string;
  image: string | null;
  description: string;
  date: string | null;
  tag: string | null;
  author: string | null;
  body: string | null;
}

interface ScrapeResponse {
  success: boolean;
  count: number;
  data: ScrapeResult[];
}

interface ScrapeArticleResponse {
     success: boolean;
     data: NewsArticle;
   }

export const useScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC News ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Scrape error:', error?.response?.data || error?.message || error);
      setError('Scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useSportScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC Sport ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-sport`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Sport scrape error:', error?.response?.data || error?.message || error);
      setError('Sport scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useTechScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC Technology ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-tech`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Technology scrape error:', error?.response?.data || error?.message || error);
      setError('Technology scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useHealthScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC Health ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-health`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Health scrape error:', error?.response?.data || error?.message || error);
      setError('Health scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useBusinessScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC Business ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-business`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Business scrape error:', error?.response?.data || error?.message || error);
      setError('Business scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useEntertainmentScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  // --- BBC Entertainment ---
  const scrape = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-entertainment`, {
        params: { url },
        timeout: 120000,
      });
      setResults(data.data);
    } catch (error: any) {
      console.error('Entertainment scrape error:', error?.response?.data || error?.message || error);
      setError('Entertainment scraping failed. Check the URL or server.');
    } finally {
      setLoading(false);
    }
  };

  return { scrape, results, loading, error };
};

export const useArticleScraper = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NewsArticle | null>(null);
  const requestIdRef = useRef(0);

  const scrape = useCallback(async (url: string) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<{ success: boolean; data: NewsArticle }>(
        `http://localhost:4000/api/scrape-article`,
        { params: { url }, timeout: 120000 }
      );
      if (requestId === requestIdRef.current) {
        setResult(data.data);
      }
    } catch (error: any) {
      console.error('Article scrape error:', error?.response?.data || error?.message || error);
      if (requestId === requestIdRef.current) {
        setError('Article scraping failed. Check the URL or server.');
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  return { scrape, result, loading, error };
};

// export const useVideoScraper = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [results, setResults] = useState<ScrapeResult[]>([]);

//   // --- BBC Video ---
//   const scrape = async (url: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { data } = await axios.get<ScrapeResponse>(`http://localhost:4000/api/scrape-video`, {
//         params: { url },
//         timeout: 120000,
//       });
//       setResults(data.data);
//     } catch (error: any) {
//       console.error('Video scrape error:', error?.response?.data || error?.message || error);
//       setError('Video scraping failed. Check the URL or server.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { scrape, results, loading, error };
// };