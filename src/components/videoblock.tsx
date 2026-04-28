import { FaRegCirclePlay } from "react-icons/fa6";

export default function VideoBlock({ url, title, date }: 
    {url: string, title: string, date: string}) {
    return(
        <>
            <div className="w-48 h-[95%] md:h-[95%] ml-5 flex flex-col justify-between bg-white rounded-md">
                <div className="relative h-[70%]">
                    <img src={url} alt={title} className="w-full bg-gray-400 h-full object-cover rounded-md"/>
                    <FaRegCirclePlay className="absolute top-1/2 left-1/2 text-6xl -translate-1/2 text-white"/>
                </div>
                <div className="pb-4">
                    <h2 className="text-lg md:text-2xl font-bold mb-2 pl-2 ">{title}</h2>
                    <p className="text-gray-400 text-sm pl-2">{date}</p>
                </div>
            </div>
        </>
    )
}