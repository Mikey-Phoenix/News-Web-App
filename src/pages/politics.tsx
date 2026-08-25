import NewsBlock from "../components/newsblock"
import MoreNewsBlock from "../components/morenewsblock"
import { useScraper } from "../hooks/useScraper"
import { FaAngleRight } from "react-icons/fa6"
import Footer from "../components/footer"
import { useEffect, useRef } from "react"
import { mapArticleToNewsBlock } from "../utils/mapArticleToNewsBlock"
import Skeleton from 'react-loading-skeleton';
import { AlertTrigger } from '../utils/alerts';

function politics() {

    const { scrape: scrapeNews, results: results, loading, error } = useScraper();
    
    const hasScraped = useRef(false);
    useEffect(() => {
        if (hasScraped.current) return;
            hasScraped.current = true;
        scrapeNews('https://www.bbc.com/news');
    }, []);


    if (loading) return (
        <div className='flex flex-col md:flex-row gap-4 p-5'>
            <div className='w-full order-1 md:order-2'>
                <div className='bg-[#FAFAFA] space-x-4 p-5'>
                    <Skeleton height={320} width="100%" />
                    <Skeleton height={35} width="90%" className="mt-2" />
                    <Skeleton height={20} width="35%" className="mt-2" />
                </div>
            </div>

            <div className='md:w-1/3 order-2 md:order-3'>
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
    if (error) return <AlertTrigger show={!!error} title="Please Check Internet Connection" icon="warning" />;
    if (results.length === 0) return <AlertTrigger show={!!error} title="There was a problem with the Server" icon="error" /> 
    
    const filteredResults = results.filter((article:any) => 
        !article.image?.includes('-60x') 
    )

    const mappedArticles = filteredResults.map((article:any) => {
        const mapped = mapArticleToNewsBlock(article);
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

    const moreArticles = uniqueArticles
    .filter((article:any) => article.story !== uniqueArticles[0].story)
    .filter((article:any) => article.story !== uniqueArticles[1].story)
    .filter((article:any) => article.story !== uniqueArticles[2].story)
    .slice(0, 10);

    const lastArticles = mappedArticles
    .filter((article:any) => article.story !== uniqueArticles[0].story)
    .filter((article:any) => article.story !== uniqueArticles[1].story)
    .filter((article:any) => article.story !== uniqueArticles[2].story)
    .filter((article:any) => !moreArticles.some((other:any) => other.title === article.title))
    .slice(0, 4)

    console.log("unique articles")
    console.log(uniqueArticles)

    return (
        <>
            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Politics <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row px-2 md:px-10 pt-3">
                <div className="w-full">
                    <NewsBlock title={uniqueArticles[0].title} description={uniqueArticles[0].description} imageUrl={uniqueArticles[0].imageUrl} story={uniqueArticles[0].story} isHot={uniqueArticles[0].isHot} isBig={uniqueArticles[0].isBig} date={uniqueArticles[0].date} location={uniqueArticles[0].location}/>
                </div>
                <div className="md:w-1/3">
                    <NewsBlock title={uniqueArticles[1].title} description={uniqueArticles[1].description} imageUrl={uniqueArticles[1].imageUrl} story={uniqueArticles[1].story} isHot={uniqueArticles[1].isHot} isBig={false} date={uniqueArticles[1].date} location={uniqueArticles[1].location} />
                    <NewsBlock title={uniqueArticles[2].title} description={uniqueArticles[2].description} imageUrl={uniqueArticles[2].imageUrl} story={uniqueArticles[2].story} isHot={uniqueArticles[2].isHot} isBig={false} date={uniqueArticles[2].date} location={uniqueArticles[2].location} />
                </div>

            </div>

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">More News on Politics <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

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

export default politics