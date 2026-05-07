import React, { useState, useEffect } from 'react';
import { useScraper, useSportScraper, useTechScraper, useHealthScraper, useBusinessScraper, useEntertainmentScraper, useVideoScraper } from '../hooks/useScraper';
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
import Footer from "../components/footer";

function home() {

    const { scrape, results, loading, error } = useScraper();
    const { scrape: scrapeSport, results: sportResults } = useSportScraper();
    const { scrape: scrapeTech, results: techResults } = useTechScraper();
    const { scrape: scrapeHealth, results: healthResults } = useHealthScraper();
    const { scrape: scrapeBusiness, results: businessResults } = useBusinessScraper();
    const { scrape: scrapeEntertainment, results: entertainmentResults } = useEntertainmentScraper();
    const { scrape: scrapeVideo, results: videoResults } = useVideoScraper();

    useEffect(() => {
        scrape('https://www.bbc.com/news');  // 👈 Change this to any news URL you want to test
        scrapeSport('https://www.bbc.com/sport');
        scrapeTech('https://www.bbc.com/technology');
        scrapeHealth('https://www.bbc.com/health');
        scrapeBusiness('https://www.bbc.com/business');
        scrapeEntertainment('https://www.bbc.com/culture');
        scrapeVideo('https://www.bbc.com/news/video_and_audio');
    }, []);

    if (loading) return <p>Scraping...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (results.length === 0) return <p>No articles found.</p>;

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

    const mappedArticles = filteredResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });
    

    const uniqueArticles = mappedArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
;
    const firstArticle = uniqueArticles[0];

    const otherArticles = uniqueArticles
    .filter((article) => article.story !== firstArticle.story)
    .filter((article) => !article.imageUrl?.includes('placeholder'))
    .slice(0, 2);

    const shortArticles = uniqueArticles
    .filter((article) => article.story !== firstArticle.story)
    .filter((article) => !otherArticles.some((other) => other.story === article.story))
    .slice(0, 4);
    const shortArticlesTwo = uniqueArticles
    .filter((article) => article.story !== firstArticle.story)
    .filter((article) => !otherArticles.some((other) => other.story === article.story))
    .filter((article) => !shortArticles.some((short) => short.story === article.story))
    .slice(0, 4);
    const shortArticlesThree = uniqueArticles
    .filter((article) => article.story !== firstArticle.story)
    .filter((article) => !otherArticles.some((other) => other.story === article.story))
    .filter((article) => !shortArticlesTwo.some((short) => short.story === article.story))
    .slice(0, 4);
    const shortArticlesExtra = uniqueArticles
    .filter((article) => article.story !== firstArticle.story)
    .filter((article) => !otherArticles.some((other) => other.story === article.story))
    .filter((article) => !shortArticlesTwo.some((short) => short.story === article.story))
    .filter((article) => !shortArticlesThree.some((short) => short.story === article.story))
    .slice(0, 4);
    const secondArticle = shortArticlesExtra[0]

    
    const mappedSportArticles = filteredSportResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });

    const uniqueSportArticles = mappedSportArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );

    const firstSportArticle = uniqueSportArticles[0];

    const otherSportArticles = uniqueSportArticles
        .filter((article) => article.story !== firstSportArticle.story)
        // .filter((article) => !article.imageUrl?.includes('placeholder'))
        .slice(0, 3);

    const shortSportArticles = uniqueSportArticles
        .filter((article) => article.story !== firstSportArticle.story)
        .filter((article) => !otherSportArticles.some((other) => other.story === article.story))


    const mappedTechArticles = filteredTechResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });

    const uniqueTechArticles = mappedTechArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );

    const firstTechArticle = uniqueTechArticles[0];

    const otherTechArticles = uniqueTechArticles
        .filter((article) => article.story !== firstTechArticle.story)
        // .filter((article) => !article.imageUrl?.includes('placeholder'))
        .slice(0, 4);

    const mappedHealthArticles = healthResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });

    const uniqueHealthArticles = mappedHealthArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );

    const otherHealthArticles = uniqueHealthArticles.slice(0, 2);
    
    const mappedBusinessArticles = businessResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
            ...mapped,
            isHot: article.image !== null,
        };
    });

    const uniqueBusinessArticles = mappedBusinessArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    );
    
    const businessArticlesOne = uniqueBusinessArticles.slice(0, 2);
    const businessArticlesTwo = uniqueBusinessArticles.slice(2, 4);
    const businessArticlesThree = uniqueBusinessArticles.slice(4, 6);


    const mappedEntertainmentArticles = entertainmentResults.map((article) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });

    const uniqueEntertainmentArticles = mappedEntertainmentArticles.filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
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
                    <NewsBlock title={firstArticle.title} description={firstArticle.description} imageUrl={firstArticle.imageUrl} story={firstArticle.story} isHot={firstArticle.isHot} isBig={firstArticle.isBig} date={firstArticle.date} location={firstArticle.location}/>
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

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-evenly w-[90vw] mx-auto">
                {otherTechArticles.map((article, index) => (
                    <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={true} isBig={false} date={article.date} location={article.location}/>
                ))}
            </div>



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
                    <NewsBlock title={secondArticle.title} description={secondArticle.description} imageUrl={secondArticle.imageUrl} story={secondArticle.story} isHot={secondArticle.isHot} isBig={secondArticle.isBig} date={secondArticle.date} location={secondArticle.location}/>
                </div>
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Health<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 justify-evenly p-5 md:p-10">
                {otherHealthArticles.map((article, index) => (
                    <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={true} isBig={true} date={article.date} location={article.location}/>
                ))}
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Business<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

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



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Entertainment<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto mt-4 mb-5 grid grid-cols-3 gap-5">
                {uniqueEntertainmentArticles.slice(0, 3).map((article, index) => (
                    <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={false} isBig={false} date={article.date} location={article.location}/>
                ))}
            </div>


            <Footer></Footer>
        </>
    )
}

export default home