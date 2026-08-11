function fixArticlePath(url: string): string {
  let fixed = url;

  // 1. Collapse any doubled segment: /sport/sport/ -> /sport/
  fixed = fixed.replace(/\/([a-zA-Z0-9-]+)\/\1(?=\/|$)/, '/$1');

  // 2. Strip a leading /news prefix, unless it's genuinely a /news/articles/... URL
  fixed = fixed.replace(/^\/news\/(?!articles\/)/, '/');

  return fixed;
}

function redirect(story:string){
    const fixedStory = fixArticlePath(story);
    window.location.href = `/article?story=${encodeURIComponent(fixedStory)}`;
    console.log(encodeURIComponent(fixedStory));
    console.log(fixedStory);
}
export default function NewsBlock({ title, description, imageUrl, story, isHot, isBig, date, location }: { title: string, description: string, imageUrl: string, story: string, isHot: boolean, isBig: boolean, date: string, location: string }) {
  return (
        <>
            {isBig ? (
                    <div className="mb-2 mx-2 flex flex-col items-center border-b border-gray-400 overflow-hidden cursor-pointer" onClick={() => redirect(story)}>
                    {isHot && (
                            <img src={imageUrl} alt={title} className="w-full bg-gray-400 h-72 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
                            <p className="text-gray-700 text-sm md:text-base">{description}</p>
                        </div>
                        <div className="text-gray-400 text-sm pl-4 pb-1 w-full">{date} | {location}</div>
                    </div>
                
            ) : (
                <div className="mb-2 flex flex-row md:flex-col items-start md:items-center bg-white border-b mr-2 border-gray-400 overflow-hidden cursor-pointer " onClick={() => redirect(story)}>
                        {isHot && (
                            <img src={imageUrl} alt={title} className="w-[50%] md:w-full h-28 bg-gray-400 object-cover" />
                        )}
                        <div className="p-4 w-full ">
                            <h2 className="text-lg font-bold mb-2">{title}</h2>
                            {isHot && (
                                <p className="text-gray-700 text-sm md:text-base">{description}</p>
                            )}
                        <div className="text-gray-400 md:pl-4 pb-1 w-full text-sm">{date} | {location}</div>
                        </div>
                    </div>
            )}
        </>
    )
}