

function redirect(url:string){
    window.location.href = url;
}

export default function MoreNewsBlock({title, description, imageUrl, story, date, location, time}: {
    title: string, description: string, imageUrl: string, story: string, date: string, location: string, time: string }) {
        return (
            <>
                <div className="w-full min-h-[200px] p-4 mb-2 flex flex-col-reverse md:flex-row  justify-between rounded-md bg-gray-100 cursor-pointer hover:shadow-md" onClick={()=>{redirect(story)}}>
                    <div className="flex flex-col h-[160px] justify-evenly ">
                        <h2 className="text-xl md:text-2xl font-bold text-[var(--tertiary)]">{title}</h2>
                        <p className="text-sm">{description}</p>
                        <p className="text-[var(--secondary)] italic text-sm">{location}, {date}  {time}</p>
                    </div>
                    <img src={imageUrl} alt={title} className="h-[200px] min-h-200px min-w-[200px] rounded-md" />
                </div>
            </>
        )
    }