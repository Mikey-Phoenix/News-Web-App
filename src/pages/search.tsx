import React, {useState} from 'react';
import MoreNewsBlock from '../components/morenewsblock';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from "react-icons/io5";
import Footer from "../components/footer";
// import { RxHamburgerMenu } from "react-icons/rx";

export default function Search () {
    console.log(localStorage.getItem('SearchParam'))
    let SearchParam = localStorage.getItem('SearchParam');
    let searchResults:any = [];
    // if (localStorage.getItem('SearchParam') == "" || localStorage.getItem('SearchParam') == undefined) {

    // }
    function setSearchTerm (item:any) {
        if (item.value !== "" )  {
            if (item.value !== undefined) {
                localStorage.setItem('SearchParam', item.value)
                console.log(item.value)
                item.parentElement.children[2].style.display = "block";
            }
        } else {
            item.parentElement.children[2].style.display = "none";
            console.log(item)
        }
    }
    function clearSearchBar (input:any) {
        input.value = "";
        input.placeholder = "Search news, topics and more";
        SearchParam = "";
        localStorage.setItem('SearchParam', "");
        searchResults = [];
    }
    let prevNews = JSON.parse(localStorage.getItem('prevNews') || "[]");
    prevNews.forEach((news:any)=>{
        // console.log(news)
        for (let index = 0; index < news.length; index++) {
            const element = news[index];
            // console.log(element)
            if (localStorage.getItem('SearchParam') !== "") {
                if(element.title.toLowerCase().includes(localStorage.getItem('SearchParam')) || element.description.toLowerCase().includes(localStorage.getItem('SearchParam')) || element.date.toLowerCase().includes(localStorage.getItem('SearchParam'))) {
                    searchResults.push(element);
                    console.log(searchResults) 
                }
            } else {
                return <div>Search an item</div>
            }
        }
    })
    return (
        <>
            <div className='w-[90%] mx-auto p-4 '>
                <div className="relative">
                    {SearchParam ? (
                        <input className='w-full text-xl border border-2 rounded-sm p-2 border-[var(--tertiary)]' type="text" placeholder={SearchParam} onChange={(e) => setSearchTerm(e.target)} />
                    ) : (
                        <input className='w-full text-xl border border-2 rounded-sm p-2 border-[var(--tertiary)]' type="text" placeholder='Search news, topics and more' onChange={(e) => setSearchTerm(e.target)} />

                    )}
                    <IoMdSearch className="absolute top-[50%] right-0 w-[15%] md:w-[10%] lg:w-[5%] h-full py-2 cursor-pointer translate-y-[-50%] text-white bg-[var(--tertiary)] rounded-md" onClick={(e) => setSearchTerm(e.target.parentElement.children[0].value)} />
                    {SearchParam && (
                        <IoClose className="absolute top-[50%] right-15 w-[15%] md:w-[10%] lg:w-[5%] h-full py-2 cursor-pointer translate-y-[-50%] text-[var(--tertiary)] bg-white border-y-2 border-[var(--tertiary)]" onClick={(e) => clearSearchBar(e.target.parentElement.children[0])}/>
                    )}
                    

                </div>

                {searchResults.length > 0 ? (
                    <div className='mt-20'>
                        {searchResults.map((article:any, index:number)=>(
                            <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} time="" />

                        ))}
                    </div>

                ) : (
                    <div className='mt-20 mx-auto w-fit text-4xl'>No Results Found</div>
                )}
            </div>

            <Footer/>
        </>
    )

} 