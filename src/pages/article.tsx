import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaShareAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import NewsBlock from "../components/newsblock";
import MoreNewsBlock from "../components/morenewsblock";
import { mapArticleToNewsBlock } from '../utils/mapArticleToNewsBlock';
import Footer from "../components/footer";
import { useScraper, useSportScraper, useTechScraper, useHealthScraper, useBusinessScraper, useEntertainmentScraper, useArticleScraper } from '../hooks/useScraper';

function article(){

    const [searchParams] = useSearchParams();
    const story = searchParams.get('story');
    const hasRunRef = useRef<string | null>(null);
    // console.log('====================================');
    // console.log(story);
    // console.log('====================================');

    const { scrape: scrapeNews, results, loading, error: newsError } = useScraper();
    const { scrape: scrapeSport, results: sportResults, loading: sportLoading } = useSportScraper();
    const { scrape: scrapeTech, results: techResults, loading: techLoading } = useTechScraper();
    const { scrape: scrapeHealth, results: healthResults, loading: healthLoading } = useHealthScraper();
    const { scrape: scrapeBusiness, results: businessResults, loading: businessLoading } = useBusinessScraper();
    const { scrape: scrapeEntertainment, results: entertainmentResults, loading: entertainmentLoading } = useEntertainmentScraper();
    const { scrape: scrapeArticle, result: articleResult, loading: articleLoading, error } = useArticleScraper();

    const BBC_CATEGORIES = ['/news', '/sport', '/technology', '/business', '/entertainment', '/health'];

    function currentCategory(story: string): string | null {
        for (const category of BBC_CATEGORIES) {
            if (story.startsWith("https://www.bbc.com" + category)) {
            return category;
            }
        }
        return null;
    }

    const category = story ? currentCategory(story) : null;

    useEffect(() => {
        if (story && hasRunRef.current !== story) {
            hasRunRef.current = story;
            if (story) {
                scrapeArticle(story);
                console.log('====================================');
                console.log(story);
                console.log('====================================');
            }
            console.log(articleResult)
        }
    }, [story, articleResult]);

    useEffect(() => {
        switch (category) {
            case '/news':
                scrapeNews('https://www.bbc.com/news');
                break;
            case '/sport':
                scrapeSport('https://www.bbc.com/sport');
                break;
            case '/technology':
                scrapeTech('https://www.bbc.com/technology');
                break;
            case '/health':
                scrapeHealth('https://www.bbc.com/health');
                break;
            case '/business':
                scrapeBusiness('https://www.bbc.com/business');
                break;
            case '/entertainment':
                scrapeEntertainment('https://www.bbc.com/culture');
                break;
        }
    }, [category]); // only re-run when category actually changes

    // let otherArticles;

    useEffect(() => {
        console.log(results);
    }, [results]);
    const filteredResults = results.filter((article:any) => 
        !article.image?.includes('-60x')
    );
    const mappedArticles = filteredResults.map((article:any) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
        });
    console.log("mapped results:", mappedArticles)
    let uniqueArticles = mappedArticles.filter(
        (article, index, self) =>
        index === self.findIndex((a) => a.story === article.story)
    );
    console.log("unique results:", uniqueArticles)
    const otherArticles = uniqueArticles
    // .filter((article:any) => article.story !== articleResult.story || null)
    // .filter((article:any) => !article.imageUrl?.includes('placeholder'))
    .slice(0, 3);
    console.log("other results:", otherArticles)
    const shortArticles = uniqueArticles
    // .filter((article:any) => article.story !== firstArticle.story)
    .filter((article:any) => !otherArticles.some((other:any) => other.story === article.story))
    .slice(0, 6);
    console.log("short results:", shortArticles)


    function formatArticleDate(isoString: string): string {
        const date = new Date(isoString);

        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const monthName = date.toLocaleDateString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();

        // Ordinal suffix: 1st, 2nd, 3rd, 4th... 11th-13th are always "th"
        const getOrdinal = (n: number): string => {
            const remainder100 = n % 100;
            if (remainder100 >= 11 && remainder100 <= 13) return `${n}th`;
            switch (n % 10) {
            case 1: return `${n}st`;
            case 2: return `${n}nd`;
            case 3: return `${n}rd`;
            default: return `${n}th`;
            }
        };

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;
        const minutesStr = minutes.toString().padStart(2, '0');

        return `${dayName}, ${getOrdinal(day)} ${monthName}, ${year}. ${hours}:${minutesStr}${ampm}`;
    }

    function formatArticleBody(rawBody: string): string[] {
    return rawBody
        .replace(/\\"/g, '"')      // unescape quotes
        .replace(/\\n/g, '\n')     // in case \n is literal backslash-n too
        .split(/\n\n+/)             // split into paragraphs
        .map(p => p.trim())
        .filter(p => p.length > 0); // remove empty paragraphs
    }

    return (
        <>

            {articleLoading && 
                <div className="w-100vw -mt-18 md:-mt-6 mb-10 bg-gray-200">
                    <div className='w-[95vw] md:w-[80vw] lg:w-[60vw] p-5 md:p-10 mx-auto'>
                        <div className='bg-[#FAFAFA] space-x-4 p-5'>
                            <Skeleton height={320} width="100%" />
                            <Skeleton height={35} width="90%" className="mt-2" />
                            <Skeleton height={20} width="35%" className="mt-2" />
                        </div>
                    </div>
                </div>
            }

            {error && <p className="error">{error}</p>}

            {!articleLoading && !error && articleResult && (
                <div className="w-100vw -mt-18 md:-mt-6 mb-10 bg-gray-200 ">
                    <div className="w-[95vw] md:w-[80vw] lg:w-[60vw] p-5 md:p-10 mx-auto bg-white ">
                        <h1 className="font-bold text-2xl md:text-4xl">{articleResult.title}</h1>
                        <div className="mt-3 flex flex-col md:flex-row justify-between md:items-center space-y-2">
                            {articleResult.date &&
                                <p className="text-[var(--secondary)] italic">{formatArticleDate(articleResult.date)}</p>
                            }
                            <div className="flex items-center space-x-4">
                                <p>Share <FaShareAlt className="inline" /></p>
                                <button className="border p-1 rounded-md text-sm md:text-base">Add as Preferred on Google</button>
                            </div>
                        </div>
                        <p className="font-bold mt-2">{articleResult.author}</p>
                        {articleResult.image && 
                            <img src={articleResult.image} alt={articleResult.title} className="w-full h-[200px] md:h-[400px] mt-10 border"/>
                        }
                        <p className="text-gray-400 mb-6 text-xs">{articleResult.description}</p>

                        {articleResult.body && (
                            <div className="article-body">
                                {formatArticleBody(articleResult.body).map((paragraph, i) => (
                                    <p className='mb-3 md:text-xl' key={i}>{paragraph}</p>
                                ))}
                            </div>
                        )}
                        {/* <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi!</p>
                        <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus distinctio sed harum voluptate porro ratione, quo natus amet nulla magni culpa ducimus quia iusto vero. Pariatur incidunt nobis itaque. Quasi!</p>
                        <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus distinctio sed harum voluptate porro ratione, quo natus amet nulla magni culpa ducimus quia iusto vero. Pariatur incidunt nobis itaque. Quasi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt iure deleniti assumenda quaerat similique qui, dignissimos rem quidem, in omnis officia facere nulla laudantium error ratione. Veritatis numquam commodi maiores?</p>
                        <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi!</p> */}
                    </div>
                </div>
            )}



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Related <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto mb-10 grid md:grid-cols-3 gap-5">
                {otherArticles && otherArticles.length > 0 && otherArticles.map((article:any, index:number) => (
                    <NewsBlock 
                        key={index} 
                        title={article.title} 
                        description={article.description} 
                        imageUrl={article.imageUrl} 
                        story={article.story} 
                        isHot={article.isHot} 
                        isBig={false} 
                        date={article.date} 
                        location={article.location}
                    />
                ))}
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                {shortArticles && shortArticles.length > 0 && shortArticles.map((article:any, index:number) => (
                    <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} time="" />
                ))}

            </div>

            <Footer />
        </>
    )
}

export default article