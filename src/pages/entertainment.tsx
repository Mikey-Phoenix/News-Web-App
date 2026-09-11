import NewsBlock from "../components/newsblock"
import MoreNewsBlock from "../components/morenewsblock"
import { useEntertainmentScraper, useVideoScraper } from "../hooks/useScraper"
import VideoBlock from "../components/videoblock"
import { FaAngleRight } from "react-icons/fa6"
import Footer from "../components/footer"
import { useEffect, useRef } from "react"
import { mapArticleToNewsBlock, mapArticleToVideoBlock } from "../utils/mapArticleToNewsBlock"
import { AlertTrigger } from '../utils/alerts';
import Skeleton from "react-loading-skeleton";

function entertainment() {

    const { scrape, results: results, loading, error } = useEntertainmentScraper();
    const { scrape: videoScrape, results: videoResults, loading: videoLoading, error: videoError } = useVideoScraper();
                
    const hasScraped = useRef(false);
    useEffect(() => {
        if (hasScraped.current) return;
            hasScraped.current = true;
        scrape('https://www.bbc.com/culture');
        videoScrape('https://www.bbc.com/video')
    }, []);


    if (loading) return <p>
                <div className='w-[95%] h-full flex flex-col md:flex-row gap-4 my-10 mx-auto'>
                    <div className='w-full h-full bg-[#FAFAFA] space-x-4 p-5'>
                        <Skeleton height={150} width="100%" />
                        <Skeleton height={70} width="90%" className="mt-2" />
                        <Skeleton height={50} width="35%" className="mt-2" />
                    </div>
                    <div className='w-full bg-[#FAFAFA] space-x-4 mt-4 p-5'>
                        <Skeleton height={150} width="100%" />
                        <Skeleton height={70} width="90%" className="mt-2" />
                        <Skeleton height={50} width="35%" className="mt-2" />
                    </div>
                    <div className='w-full h-full bg-[#FAFAFA] space-x-4 p-5'>
                        <Skeleton height={150} width="100%" />
                        <Skeleton height={70} width="90%" className="mt-2" />
                        <Skeleton height={50} width="35%" className="mt-2" />
                    </div>
                    <div className='w-full h-full bg-[#FAFAFA] space-x-4 mt-4 p-5'>
                        <Skeleton height={150} width="100%" />
                        <Skeleton height={70} width="90%" className="mt-2" />
                        <Skeleton height={50} width="35%" className="mt-2" />
                    </div>
            </div></p>;
    if (error) return <AlertTrigger show={!!error} title="Please Check Internet Connection" icon="warning" />;
    if (results.length === 0) return <AlertTrigger show={!!error} title="There was a problem with the Server" icon="error" />;

    const filteredResults = results.filter((article:any) => 
        !article.image?.includes('-60x') 
    )
    const filteredVideoResults = videoResults.filter((article:any) => 
        !article.image?.includes('-60x') 
    )

    const mappedArticles = filteredResults.map((article:any) => {
        const mapped = mapArticleToNewsBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });
    const mappedVideoArticles = filteredVideoResults.map((article:any) => {
        const mapped = mapArticleToVideoBlock(article);
        return {
                ...mapped,
                isHot: article.image !== null,  // 👈 true if image exists, false if not
            };
    });

    const uniqueArticles = mappedArticles
    .filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    )
    .filter((article:any) => article.imageUrl !== null);
    const uniqueVideoArticles = mappedVideoArticles
    .filter(
        (article, index, self) =>
            index === self.findIndex((a) => a.story === article.story)
    )
    .filter((article:any) => article.imageUrl !== null);

    const moreArticles = uniqueArticles
    .filter((article:any) => article.story !== uniqueArticles[0].story)
    .filter((article:any) => article.story !== uniqueArticles[1].story)
    .slice(0, 9);

    const lastArticles = mappedArticles
    .filter((article:any) => article.story !== uniqueArticles[0].story)
    .filter((article:any) => article.story !== uniqueArticles[1].story)
    .filter((article:any) => !moreArticles.some((other:any) => other.title === article.title))
    .slice(0, 4)


    return (
        <>
            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Entertainment <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="my-5 w-[93vw] md:w-[90vw] mx-auto h-[60vh] max-h-[300px] lg:max-h-[600px] rounded-md overflow-x-auto overflow-y-hidden bg-[var(--offbg)]">
                <div className="h-full w-max mt-5 px-8 md:px-16 py-4 flex">
                    {uniqueVideoArticles.map((article:any, index:number) => (
                        <VideoBlock key={index} url={article.imageUrl} story={article.story} title={article.title} date={article.date} isWhite={true} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-evenly p-5 md:p-10">
                <NewsBlock title={uniqueArticles[0].title} description={uniqueArticles[0].description} imageUrl={uniqueArticles[0].imageUrl} story={uniqueArticles[0].story} isHot={uniqueArticles[0].isHot} isBig={uniqueArticles[0].isBig} date={uniqueArticles[0].date} location={uniqueArticles[0].location}/>
                <NewsBlock title={uniqueArticles[1].title} description={uniqueArticles[1].description} imageUrl={uniqueArticles[1].imageUrl} story={uniqueArticles[1].story} isHot={uniqueArticles[1].isHot} isBig={uniqueArticles[1].isBig} date={uniqueArticles[1].date} location={uniqueArticles[1].location}/>
            </div>

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">More Entertainment News <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                {moreArticles.map((article:any, index:number) => (
                    <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} time={article.date} />
                ))}
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-evenly w-[90vw] mx-auto pt-6">
                {lastArticles.map((article:any, index:number) => (
                    <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={article.isHot} isBig={false} date={article.date} location={article.location} />
                ))}
            </div>


            <Footer />
        </>
    )
}

export default entertainment