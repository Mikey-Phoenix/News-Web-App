import NewsBlock from "../components/newsblock"
import MoreNewsBlock from "../components/morenewsblock"
import { FaAngleRight } from "react-icons/fa6"
import Footer from "../components/footer"

function hot() {

    // console.log(JSON.parse(localStorage.getItem("prevNews")))
    let prevNews = JSON.parse(localStorage.getItem("prevNews") || "[]");
    if (prevNews.length === 0) {
        window.location.href = "/"
    }   

    let latestNews: any = [];

    prevNews.forEach((news:any)=>{
        // console.log(news);
        for (let index = 0; index < news.length; index++) {
            const element = news[index];
            console.log(element);
            if (element.date.includes("hrs") || element.date.includes("mins") || element.date.includes("hr") || element.date.includes("min")) {
                latestNews.push(element)
            }
        }
    })

    console.log(latestNews);
    let moreLatest = latestNews.slice(3, 9);
    const mayAlsoLike = latestNews
    .filter((article:any) => !moreLatest.some((other:any) => other.story === article.story)).slice(9, 13) ;
    // const mayAlsoLike = moreLatest.slice(0, 6);
    return (
        <>
            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Hot <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>
            {latestNews && (
                <div className="flex flex-col md:flex-row p-5 md:px-10 pt-3">
                    <div className="w-full">
                            <NewsBlock title={latestNews[0]?.title || "Latest News"} imageUrl={latestNews[0]?.imageUrl || "https://via.placeholder.com/400x200"} description={latestNews[0]?.description} story={latestNews[0]?.story || "/article"} isHot={true} isBig={true} date={latestNews[0]?.date || "17th May"} location={latestNews[0]?.location || "Lagos"} />
                    </div>
                    <div className="md:w-1/3">
                        <NewsBlock title={latestNews[1]?.title || "Latest News"} description={latestNews[1]?.description} imageUrl={latestNews[1]?.imageUrl || "https://via.placeholder.com/400x200"} story={latestNews[1]?.story || "/article"} isHot={true} isBig={false} date={latestNews[1]?.date || "17th May"} location={latestNews[1]?.location || "Lagos"} />
                        <NewsBlock title={latestNews[2]?.title || "Latest News"} description={latestNews[2]?.description} imageUrl={latestNews[2]?.imageUrl || "https://via.placeholder.com/400x200"} story={latestNews[2]?.story || "/article"} isHot={true} isBig={false} date={latestNews[2]?.date || "17th May"} location={latestNews[2]?.location || "Lagos"} />
                    </div>

                </div>
            )}

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">More Hot News <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                {moreLatest.map((article:any, index:number) => (
                    <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} time={article.date} />
                ))}
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row justify-evenly w-[90vw] mx-auto pt-6">
                {mayAlsoLike.map((article:any, index:number) => (
                        <NewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} isHot={article.isHot} isBig={false} date={article.date} location={article.location}/>

                ))}
            </div>


            <Footer />
        </>
    )
}

export default hot