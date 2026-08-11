import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaShareAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import NewsBlock from "../components/newsblock";
import MoreNewsBlock from "../components/morenewsblock";
import Footer from "../components/footer";
import { useScraper, useSportScraper, useTechScraper, useHealthScraper, useBusinessScraper, useEntertainmentScraper, useArticleScraper } from '../hooks/useScraper';

function article(){

    const [searchParams] = useSearchParams();
    const story = searchParams.get('story');
    const hasRunRef = useRef<string | null>(null);
    // console.log('====================================');
    // console.log(story);
    // console.log('====================================');

    // const { scrape: scrapeNews, results, loading, error } = useScraper();
    // const { scrape: scrapeSport, results: sportResults, loading: sportLoading } = useSportScraper();
    // const { scrape: scrapeTech, results: techResults, loading: techLoading } = useTechScraper();
    // const { scrape: scrapeHealth, results: healthResults, loading: healthLoading } = useHealthScraper();
    // const { scrape: scrapeBusiness, results: businessResults, loading: businessLoading } = useBusinessScraper();
    // const { scrape: scrapeEntertainment, results: entertainmentResults, loading: entertainmentLoading } = useEntertainmentScraper();
    const { scrape: scrapeArticle, result: articleResult, loading: articleLoading, error } = useArticleScraper();

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
        // scrapeNews('https://www.bbc.com/news');
        // scrapeSport('https://www.bbc.com/sport');
        // scrapeTech('https://www.bbc.com/technology');
        // scrapeHealth('https://www.bbc.com/health');
        // scrapeBusiness('https://www.bbc.com/business');
        // scrapeEntertainment('https://www.bbc.com/culture');
    }, [story, articleResult]);

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
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                </div>
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                </div>
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                </div>
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
            </div>

            <Footer />
        </>
    )
}

export default article