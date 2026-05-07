import { FaShareAlt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import NewsBlock from "../components/newsblock";
import MoreNewsBlock from "../components/morenewsblock";
import Footer from "../components/footer"

function article(){
    return (
        <>
            <div className="w-100vw -mt-18 md:-mt-6 mb-10 bg-gray-200 ">
                <div className="w-[95vw] md:w-[80vw] lg:w-[60vw] p-5 md:p-10 mx-auto bg-white ">
                    <h1 className="font-bold text-2xl md:text-4xl">Big News Title Big News Title Big News Title Big News Title</h1>
                    <div className="mt-3 flex flex-col md:flex-row justify-between md:items-center space-y-2">
                        <p className="text-[var(--secondary)] italic">Sunday, 17th May, 2026. 11:00AM</p>
                        <div className="flex items-center space-x-4">
                            <p>Share <FaShareAlt className="inline" /></p>
                            <button className="border p-1 rounded-md text-sm md:text-base">Add as Preferred on Google</button>
                        </div>
                    </div>
                    <p className="font-bold mt-2">Authors</p>
                    <img src="" alt="News Image" className="w-full h-[200px] md:h-[400px] mt-10 border"/>
                    <p className="text-gray-400 mb-6 text-xs">Image Description</p>
                    <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi!</p>
                    <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus distinctio sed harum voluptate porro ratione, quo natus amet nulla magni culpa ducimus quia iusto vero. Pariatur incidunt nobis itaque. Quasi!</p>
                    <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus distinctio sed harum voluptate porro ratione, quo natus amet nulla magni culpa ducimus quia iusto vero. Pariatur incidunt nobis itaque. Quasi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt iure deleniti assumenda quaerat similique qui, dignissimos rem quidem, in omnis officia facere nulla laudantium error ratione. Veritatis numquam commodi maiores?</p>
                    <p className="mb-3 md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam in ab aperiam molestias? Doloremque inventore recusandae vero. Pariatur dolorem saepe veritatis, voluptas, deserunt doloribus ipsum velit magnam nulla dicta animi!</p>
                </div>
            </div>



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