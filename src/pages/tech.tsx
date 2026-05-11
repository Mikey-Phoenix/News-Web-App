import NewsBlock from "../components/newsblock"
import MoreNewsBlock from "../components/morenewsblock"
import { useTechScraper } from "../hooks/useScraper"
import { FaAngleRight } from "react-icons/fa6"
import Footer from "../components/footer"
import { useEffect } from "react"
import { mapArticleToNewsBlock } from "../utils/mapArticleToNewsBlock"

function tech() {
    const { scrape, results: results, loading, error } = useTechScraper();
        
    useEffect(() => {
        scrape('https://www.bbc.com/technology');
    }, []);


    if (loading) return <p>Scraping...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (results.length === 0) return <p>No articles found.</p>;

    const filteredResults = results.filter((article) => 
        !article.image?.includes('-60x') &&
        article.image !== null &&
        !article.image.includes('placeholder')
    )

    const mappedArticles = filteredResults.map((article) => {
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
    .filter((article) => article.imageUrl !== null);

    const moreArticles = uniqueArticles
    .filter((article) => article.story !== uniqueArticles[0].story)
    .filter((article) => article.story !== uniqueArticles[1].story)
    .filter((article) => article.story !== uniqueArticles[2].story)
    .filter((article) => article.story !== uniqueArticles[3].story)
    .filter((article) => article.story !== uniqueArticles[4].story)
    .filter((article) => article.story !== uniqueArticles[5].story)
    .slice(0, 6);

    const lastArticles = mappedArticles
    .filter((article) => article.story !== uniqueArticles[0].story)
    .filter((article) => article.story !== uniqueArticles[1].story)
    .filter((article) => article.story !== uniqueArticles[2].story)
    .filter((article) => article.story !== uniqueArticles[3].story)
    .filter((article) => article.story !== uniqueArticles[4].story)
    .filter((article) => article.story !== uniqueArticles[5].story)
    .filter((article) => !moreArticles.some((other) => other.title === article.title))
    .slice(0, 4)

    console.log("unique articles")
    console.log(uniqueArticles)

    return (
        <>
            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Technology <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row justify-evenly p-2 md:p-10">
                <NewsBlock title={uniqueArticles[0].title} description={uniqueArticles[0].description} imageUrl={uniqueArticles[0].imageUrl} story={uniqueArticles[0].story} isHot={uniqueArticles[0].isHot} isBig={uniqueArticles[0].isBig} date={uniqueArticles[0].date} location={uniqueArticles[0].location}/>
                <NewsBlock title={uniqueArticles[1].title} description={uniqueArticles[1].description} imageUrl={uniqueArticles[1].imageUrl} story={uniqueArticles[1].story} isHot={uniqueArticles[1].isHot} isBig={uniqueArticles[1].isBig} date={uniqueArticles[1].date} location={uniqueArticles[1].location}/>
            </div>

            <div className="flex flex-col md:flex-row justify-evenly w-[90vw] mx-auto pt-6">
                <NewsBlock title={uniqueArticles[2].title} description={uniqueArticles[2].description} imageUrl={uniqueArticles[2].imageUrl} story={uniqueArticles[2].story} isHot={uniqueArticles[2].isHot} isBig={false} date={uniqueArticles[2].date} location={uniqueArticles[2].location}/>
                <NewsBlock title={uniqueArticles[3].title} description={uniqueArticles[3].description} imageUrl={uniqueArticles[3].imageUrl} story={uniqueArticles[3].story} isHot={uniqueArticles[3].isHot} isBig={false} date={uniqueArticles[3].date} location={uniqueArticles[3].location}/>
                <NewsBlock title={uniqueArticles[4].title} description={uniqueArticles[4].description} imageUrl={uniqueArticles[4].imageUrl} story={uniqueArticles[4].story} isHot={uniqueArticles[4].isHot} isBig={false} date={uniqueArticles[4].date} location={uniqueArticles[4].location}/>
                <NewsBlock title={uniqueArticles[5].title} description={uniqueArticles[5].description} imageUrl={uniqueArticles[5].imageUrl} story={uniqueArticles[5].story} isHot={uniqueArticles[5].isHot} isBig={false} date={uniqueArticles[5].date} location={uniqueArticles[5].location}/>
            </div>

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">More Tech News <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                {moreArticles.map((article, index) => (
                    <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} time={article.date} />
                ))}
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 justify-evenly w-[90vw] mx-auto pt-6">
                {lastArticles.map((article, index) => (
                    <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={article.isHot} isBig={false} date={article.date} location={article.location} />
                ))}
            </div>


            <Footer />
        </>
    )
}

export default tech