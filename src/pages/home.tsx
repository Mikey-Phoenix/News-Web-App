import React, { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useScraper, useSportScraper, useTechScraper, useHealthScraper, useBusinessScraper, useEntertainmentScraper } from '../hooks/useScraper'; 
// , useVideoScraper
import { mapArticleToNewsBlock } from '../utils/mapArticleToNewsBlock';
// import { mapSportArticleToNewsBlock } from '../utils/mapArticleToNewsBlock';
import NewsBlock from "../components/newsblock";
import VideoBlock from "../components/videoblock";
import { FaAngleRight } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";
import { FaCloudSunRain } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { IoRainy } from "react-icons/io5";
import { IoIosThunderstorm } from "react-icons/io";
// import { FaAngleDoubleRight } from "react-icons/fa";
import { AlertTrigger } from '../utils/alerts';
import Footer from "../components/footer";


function isPrevNewsEmpty(): boolean {
    // localStorage.removeItem('prevNews')
    const raw = localStorage.getItem('prevNews');
    if (!raw) return true; // key doesn't exist

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return true;
        // prevNews is an array of arrays — check if every sub-array is empty
        return parsed.every((category) => Array.isArray(category) && category.length === 0);
    } catch {
        return true; // corrupted data, treat as empty
    }
}

function getCachedNews(): any[] | null {
    const raw = localStorage.getItem('prevNews');
    if (!raw) return null;

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;
        return parsed;
    } catch {
        return null;
    }
}

function home() {

    const { scrape: scrapeNews, results, loading, error } = useScraper();
    const { scrape: scrapeSport, results: sportResults, loading: sportLoading } = useSportScraper();
    const { scrape: scrapeTech, results: techResults, loading: techLoading } = useTechScraper();
    const { scrape: scrapeHealth, results: healthResults, loading: healthLoading } = useHealthScraper();
    const { scrape: scrapeBusiness, results: businessResults, loading: businessLoading } = useBusinessScraper();
    const { scrape: scrapeEntertainment, results: entertainmentResults, loading: entertainmentLoading } = useEntertainmentScraper();
    // const { scrape: scrapeVideo, results: videoResults } = useVideoScraper();

    const hasScraped = useRef(false);

    const [cachedNews, setCachedNews] = useState<any[] | null>(null);
    const [usingCache, setUsingCache] = useState(false);

    useEffect(() => {
        if (hasScraped.current) return;
        hasScraped.current = true;

        // If cache exists, load it immediately so the page has something to show
        // while the fresh scrape runs in the background.
        if (!isPrevNewsEmpty()) {
            const cached = getCachedNews();
            if (cached) {
                setCachedNews(cached);
                setUsingCache(true);
            }
        }

        // Always scrape, regardless of whether cache exists
        scrapeNews('https://www.bbc.com/news');
        scrapeSport('https://www.bbc.com/sport');
        scrapeTech('https://www.bbc.com/technology');
        scrapeHealth('https://www.bbc.com/health');
        scrapeBusiness('https://www.bbc.com/business');
        scrapeEntertainment('https://www.bbc.com/culture');
        // scrapeVideo('https://www.bbc.com/news/video_and_audio');
    }, []);
    useEffect(() => {
        if (usingCache && results.length > 0) {
            setUsingCache(false); // fresh data has arrived, stop showing cache
        }
    }, [results, usingCache]);

    if (!usingCache && loading) return (
        <div className='flex flex-col md:flex-row gap-4 p-5'>
            <div className='md:w-1/2 order-3 md:order-1'>
                <div className='bg-[#FAFAFA] space-x-4 p-5'>
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={20} width="75%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
                <div className='bg-[#FAFAFA] space-x-4 mt-4 p-5'>
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={20} width="75%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
                <div className='bg-[#FAFAFA] space-x-4 mt-4 p-5'>
                    <Skeleton height={20} width="90%" />
                    <Skeleton height={20} width="75%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
                {/* <Skeleton count={3} /> */}
            </div>

            <div className='w-full order-1 md:order-2'>
                <div className='bg-[#FAFAFA] space-x-4 p-5'>
                    <Skeleton height={320} width="100%" />
                    <Skeleton height={35} width="90%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
            </div>

            <div className='md:w-1/2 order-2 md:order-3'>
                <div className='bg-[#FAFAFA] space-x-4 p-5'>
                    <Skeleton height={100} width="100%" />
                    <Skeleton height={30} width="90%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
                <div className='bg-[#FAFAFA] space-x-4 mt-4 p-5'>
                    <Skeleton height={100} width="100%" />
                    <Skeleton height={30} width="90%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
            </div>
        </div>
    );
    if (!usingCache && error) return <AlertTrigger show={!!error} title="Please Check Internet Connection" icon="warning" />;
    if (!usingCache && results.length === 0) return <AlertTrigger show={!!error} title="There was a problem with the Server" icon="error" /> 

    const filteredResults = results.filter((article) => 
        !article.image?.includes('-60x')
    );
    const filteredSportResults = sportResults.filter((article) =>
        !article.image?.includes('-60x') &&
        article.image !== null &&
        !article.image.includes('placeholder')
    );
    const filteredTechResults = techResults.filter((article) =>
        !article.image?.includes('-60x') &&
        article.image !== null &&
        article.date !== null &&
        !article.image.includes('placeholder')
    );

    // When using the cache, these arrays already contain mapped articles from a previous session,
    // so we use them directly instead of re-mapping fresh scrape results.
    const mappedArticles = usingCache && cachedNews ? (cachedNews[0] ?? []) : filteredResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });
    const mappedSportArticles = usingCache && cachedNews ? (cachedNews[1] ?? []) : filteredSportResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });
    const mappedTechArticles = usingCache && cachedNews ? (cachedNews[2] ?? []) : filteredTechResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });
    const mappedHealthArticles = usingCache && cachedNews ? (cachedNews[3] ?? []) : healthResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });
    const mappedBusinessArticles = usingCache && cachedNews ? (cachedNews[4] ?? []) : businessResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });
    const mappedEntertainmentArticles = usingCache && cachedNews ? (cachedNews[5] ?? []) : entertainmentResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });


    let prevNews = [mappedArticles, mappedSportArticles, mappedTechArticles, mappedHealthArticles, mappedBusinessArticles, mappedEntertainmentArticles];
    localStorage.setItem('prevNews', JSON.stringify(prevNews));
    let newsCheck = JSON.parse(localStorage.getItem('prevNews') || '[]');
   // localStorage.removeItem('prevNews');


    const uniqueArticles = mappedArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    const uniqueSportArticles = mappedSportArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    const uniqueTechArticles = mappedTechArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    const uniqueHealthArticles = mappedHealthArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    const uniqueBusinessArticles = mappedBusinessArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    const uniqueEntertainmentArticles = mappedEntertainmentArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );

    const firstArticle = uniqueArticles[0];

    const otherArticles = firstArticle ? uniqueArticles
        .filter((article) => article.story !== firstArticle.story)
        .filter((article) => !article.imageUrl?.includes('placeholder'))
        .slice(0, 2) : [];

    const shortArticles = firstArticle ? uniqueArticles
        .filter((article) => article.story !== firstArticle.story)
        .filter((article) => !otherArticles.some((other) => other.story === article.story))
        .slice(0, 4) : [];
    const shortArticlesTwo = firstArticle ? uniqueArticles
        .filter((article) => article.story !== firstArticle.story)
        .filter((article) => !otherArticles.some((other) => other.story === article.story))
        .filter((article) => !shortArticles.some((short) => short.story === article.story))
        .slice(0, 4) : [];
    const shortArticlesThree = firstArticle ? uniqueArticles
        .filter((article) => article.story !== firstArticle.story)
        .filter((article) => !otherArticles.some((other) => other.story === article.story))
        .filter((article) => !shortArticlesTwo.some((short) => short.story === article.story))
        .slice(0, 4) : [];
    const shortArticlesExtra = firstArticle ? uniqueArticles
        .filter((article) => article.story !== firstArticle.story)
        .filter((article) => !otherArticles.some((other) => other.story === article.story))
        .filter((article) => !shortArticlesTwo.some((short) => short.story === article.story))
        .filter((article) => !shortArticlesThree.some((short) => short.story === article.story))
        .slice(0, 4) : [];
    const secondArticle = shortArticlesExtra[0];


    const firstSportArticle = uniqueSportArticles[0];

    const otherSportArticles = firstSportArticle ? uniqueSportArticles
        .filter((article) => article.story !== firstSportArticle.story)
        // .filter((article) => !article.imageUrl?.includes('placeholder'))
        .slice(0, 3) : [];

    const shortSportArticles = firstSportArticle ? uniqueSportArticles
        .filter((article) => article.story !== firstSportArticle.story)
        .filter((article) => !otherSportArticles.some((other) => other.story === article.story)) : [];


    const firstTechArticle = uniqueTechArticles[0];

    const otherTechArticles = firstTechArticle ? uniqueTechArticles
        .filter((article) => article.story !== firstTechArticle.story)
        // .filter((article) => !article.imageUrl?.includes('placeholder'))
        .slice(0, 4) : [];


    const otherHealthArticles = uniqueHealthArticles.slice(0, 2);


    const businessArticlesOne = uniqueBusinessArticles.slice(0, 2);
    const businessArticlesTwo = uniqueBusinessArticles.slice(2, 4);
    const businessArticlesThree = uniqueBusinessArticles.slice(4, 6);


    function updatePrevNewsIfChanged(
        mappedArticles: any[],
        mappedSportArticles: any[],
        mappedTechArticles: any[],
        mappedHealthArticles: any[],
        mappedBusinessArticles: any[],
        mappedEntertainmentArticles: any[]
    ): void {
        const latestNews = [
            mappedArticles,
            mappedSportArticles,
            mappedTechArticles,
            mappedHealthArticles,
            mappedBusinessArticles,
            mappedEntertainmentArticles
        ];

        const latestNewsString = JSON.stringify(latestNews);
        const currentPrevNews = localStorage.getItem('prevNews');

        if (currentPrevNews !== latestNewsString) {
            localStorage.setItem('prevNews', latestNewsString);
            console.log('====================================');
            console.log("The new prevNews");
            console.log(localStorage.getItem('prevNews'));
            console.log('====================================');
        } else {
            console.log("No new articles");
        }
    }

    updatePrevNewsIfChanged(
        mappedArticles,
        mappedSportArticles,
        mappedTechArticles,
        mappedHealthArticles,
        mappedBusinessArticles,
        mappedEntertainmentArticles
    );

    return (
        <>
            <div className="flex flex-col lg:flex-row px-2 md:px-10 pt-3">
                <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 order-3 lg:order-1">
                    {shortArticles.map((article, index) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                    ))}
                </div>
                <div className="w-full order-1 lg:order-2">
                    {firstArticle && (
                        <NewsBlock title={firstArticle.title} description={firstArticle.description} imageUrl={firstArticle.imageUrl} story={firstArticle.story} isHot={firstArticle.isHot} isBig={firstArticle.isBig} date={firstArticle.date} location={firstArticle.location}/>
                    )}
                </div>
                <div className="order-2 lg:order-3 grid md:grid-cols-2 lg:grid-cols-1 lg:w-1/2">
                    {otherArticles.map((article, index) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={article.isHot} isBig={false} date={article.date} location={article.location}/>
                    ))}
                </div>

            </div>


            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Top Videos <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="my-5 w-[93vw] md:w-[90vw] mx-auto h-[60vh] max-h-[300px] lg:max-h-[600px] rounded-md overflow-x-auto overflow-y-hidden bg-[var(--offbg)]">
                <div className="h-full w-max mt-5 px-8 md:px-16 py-4 flex">
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                    <VideoBlock url="url" title="Video Title" date="17th May" />
                </div>
            </div>
            

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Sports<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            {(!usingCache && sportLoading) || !firstSportArticle ? (
                <div className="flex flex-col md:flex-row px-5 md:px-10 pt-3">
                    <Skeleton height={250} width="100%" />
                </div>
            ) : (
                <div className="flex flex-col md:flex-row px-5 md:px-10 pt-3">
                    <div className="w-full mx-2 border-r border-gray-400">
                        <NewsBlock title={firstSportArticle.title} description={firstSportArticle.description} imageUrl={firstSportArticle.imageUrl} story={firstSportArticle.story} isHot={firstSportArticle.isHot} isBig={firstSportArticle.isBig} date={firstSportArticle.date} location={firstSportArticle.location}/>
                    </div>
                    <div className="w-full md:w-1/2 mx-2 grid grid-cols-2 md:grid-cols-1">
                        {otherSportArticles.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                    <div className="hidden md:block md:w-1/2 mx-2 border-l border-gray-400">
                        {shortSportArticles.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                </div>
            )}

            <button className="bg-[var(--tertiary)] cursor-pointer ml-4 mb-3 p-2 rounded-md hover:bg-[var(--tertiary-light)] text-white">View More</button>


            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Weather<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="my-5 w-[90vw] mx-auto lg:h-[100vh] bg-[var(--tertiary)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 text-xs">
                    <div className="w-full h-[45vh] max-h-[200px] lg:max-h-full bg-gray-400 relative">
                        <div className="absolute bottom-0 flex justify-evenly w-full text-white">
                            <div className="flex flex-col items-center"><FaCloudSun/> 6:00AM</div>
                            <div className="flex flex-col items-center"><FaSun/> 12:00PM</div>
                            <div className="flex flex-col items-center"><FaCloud/> 5:00PM</div>
                            <div className="flex flex-col items-center"><IoRainy/> 8:00PM</div>
                        </div>
                    </div>
                    <div className="w-full h-[45vh] max-h-[200px] lg:max-h-full bg-gray-400 relative">
                        <div className="absolute bottom-0 flex justify-evenly w-full text-white">
                            <div className="flex flex-col items-center"><IoIosThunderstorm/> 6:00AM</div>
                            <div className="flex flex-col items-center"><IoRainy/> 12:00PM</div>
                            <div className="flex flex-col items-center"><FaCloudSunRain/> 5:00PM</div>
                            <div className="flex flex-col items-center"><FaSun/> 8:00PM</div>
                        </div>
                    </div>
                    <div className="w-full h-[45vh] max-h-[200px] lg:max-h-full bg-gray-400 relative">
                        <div className="absolute bottom-0 flex justify-evenly w-full text-white">
                            <div className="flex flex-col items-center"><FaSun/> 6:00AM</div>
                            <div className="flex flex-col items-center"><FaSun/> 12:00PM</div>
                            <div className="flex flex-col items-center"><FaSun/> 5:00PM</div>
                            <div className="flex flex-col items-center"><FaCloud/> 8:00PM</div>
                        </div>
                    </div>
                    <div className="w-full h-[45vh] max-h-[200px] lg:max-h-full bg-gray-400 relative">
                        <div className="absolute bottom-0 flex justify-evenly w-full text-white">
                            <div className="flex flex-col items-center"><FaCloudSun/> 6:00AM</div>
                            <div className="flex flex-col items-center"><FaSun/> 12:00PM</div>
                            <div className="flex flex-col items-center"><FaCloud/> 5:00PM</div>
                            <div className="flex flex-col items-center"><IoRainy/> 8:00PM</div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Technology<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            {(!usingCache && techLoading) || !firstTechArticle ? (
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-evenly w-[90vw] mx-auto">
                    <Skeleton height={200} width="100%" />
                </div>
            ) : (
                <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-evenly w-[90vw] mx-auto">
                    {otherTechArticles.map((article, index) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={true} isBig={false} date={article.date} location={article.location}/>
                    ))}
                </div>
            )}



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Politics<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex md:flex-row flex-col p-5 md:p-10">
                <div className="w-full grid grid-cols-3">
                    <div className="border-r border-gray-400 h-fit">
                        {shortArticles.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                    <div className="border-r border-gray-400 h-fit">
                        {shortArticlesTwo.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                    <div className="border-r border-gray-400 h-fit">
                        {shortArticlesThree.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                    {secondArticle && (
                        <NewsBlock title={secondArticle.title} description={secondArticle.description} imageUrl={secondArticle.imageUrl} story={secondArticle.story} isHot={secondArticle.isHot} isBig={secondArticle.isBig} date={secondArticle.date} location={secondArticle.location}/>
                    )}
                </div>
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Health<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            {!usingCache && healthLoading ? (
                <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 justify-evenly p-5 md:p-10">
                    <Skeleton height={200} width="100%" />
                </div>
            ) : (
                <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 justify-evenly p-5 md:p-10">
                    {otherHealthArticles.map((article, index) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={true} isBig={true} date={article.date} location={article.location}/>
                    ))}
                </div>
            )}



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Business<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            {!usingCache && businessLoading ? (
                <div className="w-[90vw] mx-auto grid grid-cols-3 gap-5">
                    <Skeleton height={200} width="100%" />
                </div>
            ) : (
                <div className="w-[90vw] mx-auto grid grid-cols-3 gap-5">
                    <div className="border-r border-gray-400">
                        {businessArticlesOne.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}
                    </div>
                    <div className="border-r border-gray-400">
                        {businessArticlesTwo.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}

                    </div>
                    <div className="border-r border-gray-400">
                        {businessArticlesThree.map((article, index) => (
                            <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                        ))}

                    </div>
                </div>
            )}



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Entertainment<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            {!usingCache && entertainmentLoading ? (
                <div className="w-[90vw] mx-auto mt-4 mb-5 grid grid-cols-3 gap-5">
                    <Skeleton height={200} width="100%" />
                </div>
            ) : (
                <div className="w-[90vw] mx-auto mt-4 mb-5 grid grid-cols-3 gap-5">
                    {uniqueEntertainmentArticles.slice(0, 3).map((article, index) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                    ))}
                </div>
            )}


            <Footer></Footer>
        </>
    )
}

export default home