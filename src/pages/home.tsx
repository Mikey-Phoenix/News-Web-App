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
    return (
        <>
            <div className="flex flex-col lg:flex-row px-2 md:px-10 pt-3">
                <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 order-3 lg:order-1">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                </div>
                <div className="w-full order-1 lg:order-2">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
                </div>
                <div className="order-2 lg:order-3 grid md:grid-cols-1">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
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
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
                </div>
                <div className="w-full md:w-1/2 mx-2 grid grid-cols-2 md:grid-cols-1">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                </div>
                <div className="hidden md:block md:w-1/2 mx-2 border-l border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
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

            <div className="flex flex-col md:flex-row justify-evenly w-[90vw] mx-auto">
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={false} date="17th May" location="Lagos" />
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Politics<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex md:flex-row flex-col p-5 md:p-10">
                <div className="w-full grid grid-cols-3">
                    <div className="border-r border-gray-400 h-fit">
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    </div>
                    <div className="border-r border-gray-400 h-fit">
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    </div>
                    <div className="border-r border-gray-400 h-fit">
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                        <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    </div>
                </div>
                <div className="md:w-1/2 mt-4 md:mt-0">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
                </div>
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Health<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="flex flex-col md:flex-row justify-evenly p-5 md:p-10">
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={true} isBig={true} date="17th May" location="Lagos" />
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Business<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto grid grid-cols-3 gap-5">
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                </div>
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />

                </div>
                <div className="border-r border-gray-400">
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                    <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />

                </div>
            </div>



            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Entertainment<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto mt-4 mb-5 grid grid-cols-3 gap-5">
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
                <NewsBlock title="Big News Title" description="This is a description of the big news story. It provides an overview of the main points and details of the story." imageUrl="https://via.placeholder.com/400x200" story="/article" isHot={false} isBig={false} date="17th May" location="Lagos" />
            </div>


            <Footer></Footer>
        </>
    )
}

export default home