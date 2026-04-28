import NewsBlock from "../components/newsblock"
import MoreNewsBlock from "../components/morenewsblock"
import { FaAngleRight } from "react-icons/fa6"
import Footer from "../components/footer"

function politics() {
    return (
        <>
            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Politics <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row px-10 pt-3">
                <div className="w-full">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story. This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
                </div>
                <div className="md:w-1/3">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                </div>

            </div>

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">More News on Politics <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto">
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
                <MoreNewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" date="17th May" location="Lagos" time="12:30AM" />
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">You May Also Like <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row justify-evenly w-[90vw] mx-auto pt-6">
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
            </div>


            <Footer />
        </>
    )
}

export default politics