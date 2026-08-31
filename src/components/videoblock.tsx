import { FaRegCirclePlay } from "react-icons/fa6";

function fixArticlePath(url: string): string {
  let fixed = url;

  // 1. Collapse any doubled segment: /sport/sport/ -> /sport/
  fixed = fixed.replace(/\/([a-zA-Z0-9-]+)\/\1(?=\/|$)/, '/$1');

  // 2. Strip a leading /news prefix, unless it's genuinely a /news/articles/... URL
  fixed = fixed.replace(/^\/news\/(?!articles\/)/, '/');

  return fixed;
}
function redirectToVideo(story:string){
    const fixedStory = fixArticlePath(story);
    // window.location.href = `/video?story=${encodeURIComponent(fixedStory)}`;
    window.location.replace(fixedStory)
    console.log(encodeURIComponent(fixedStory));
    console.log(fixedStory);
}
export default function VideoBlock({ url, story, title, date, isWhite }: 
    {url: string, story: string, title: string, date: string, isWhite: boolean}) {
    return(
        <>
            {isWhite ?(
                <div className="w-48 h-[95%] md:h-[95%] ml-5 flex flex-col justify-between bg-white rounded-md hover:cursor-pointer">
                    <div className="relative h-[70%]" onClick={() => redirectToVideo(story)}>
                        <img src={url} alt={title} className="w-full bg-gray-400 h-full object-cover rounded-md"/>
                        <FaRegCirclePlay className="absolute top-1/2 left-1/2 text-6xl -translate-1/2 text-white"/>
                    </div>
                    <div className="pb-4 h-[30%]">
                        <h2 className="text-lg h-[90%] overflow-hidden font-bold mb-2 pl-2 ">{title}</h2>
                        <p className="text-gray-400 text-sm pl-2">{date}</p>
                    </div>
                </div>
            ):(
                <div className="w-48 h-[95%] md:h-[95%] ml-5 flex flex-col justify-between bg-[var(--tertiary)] rounded-md hover:cursor-pointer">
                    <div className="relative h-[70%]" onClick={() => redirectToVideo(story)}>
                        <img src={url} alt={title} className="w-full bg-gray-400 h-full object-cover rounded-md"/>
                        <FaRegCirclePlay className="absolute top-1/2 left-1/2 text-6xl -translate-1/2 text-white"/>
                    </div>
                    <div className="pb-4 h-[30%]">
                        <h2 className="text-lg text-white h-[90%] overflow-hidden font-bold mb-2 pl-2 ">{title}</h2>
                        <p className="text-gray-400 text-sm pl-2">{date}</p>
                    </div>
                </div>
            )}
        </>
    )
}