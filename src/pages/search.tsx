import React, {useState} from 'react';
import MoreNewsBlock from '../components/morenewsblock';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from "react-icons/io5";
import Footer from "../components/footer";
// import { RxHamburgerMenu } from "react-icons/rx";

export default function Search () {
    console.log(localStorage.getItem('SearchParam'))
    let SearchParam = localStorage.getItem('SearchParam');
    function setSearchTerm (item:any) {
       localStorage.setItem('SearchParam', item)
    }
    let prevNews = JSON.parse(localStorage.getItem('prevNews') || "[]");
    let searchResults:any = [];
    prevNews.forEach((news)=>{
        // console.log(news)
        for (let index = 0; index < news.length; index++) {
            const element = news[index];
            // console.log(element)
            if(element.title.includes(localStorage.getItem('SearchParam')) || element.description.includes(localStorage.getItem('SearchParam')) || element.date.includes(localStorage.getItem('SearchParam'))) {
                searchResults.push(element);
                console.log(searchResults) 
            }
        }
    })
    return (
        <>
            <div className='w-[90%] mx-auto p-4 '>
                <div className="relative">
                    {SearchParam ? (
                        <input className='w-full text-xl border border-2 rounded-sm p-2 border-[var(--tertiary)]' type="text" placeholder='Search news, topics and more' value = {SearchParam} onChange={(e) => setSearchTerm(e.target.value)} />
                    ) : (
                        <input className='w-full text-xl border border-2 rounded-sm p-2 border-[var(--tertiary)]' type="text" placeholder='Search news, topics and more' onChange={(e) => setSearchTerm(e.target.value)} />

                    )}
                    <IoMdSearch className="absolute top-[50%] right-0 w-[15%] md:w-[10%] lg:w-[5%] h-full py-2 cursor-pointer translate-y-[-50%] text-white bg-[var(--tertiary)] rounded-md" />
                    <IoClose className="absolute top-[50%] right-15 w-[15%] md:w-[10%] lg:w-[5%] h-full py-2 cursor-pointer translate-y-[-50%] text-[var(--tertiary)] bg-white border-y-2 border-[var(--tertiary)]" />
                    

                </div>

                <div className='mt-20'>
                    {searchResults.map((article, index)=>(
                        <MoreNewsBlock key={index} title={article.title} description={article.description} imageUrl={article.imageUrl} story={article.story} date={article.date} location={article.location} />

                    ))}
                    {/* <MoreNewsBlock key="1" title='Title' description='Description' imageUrl='' story='Story' date='Date' location='Location' time='Time' />
                    <MoreNewsBlock key="1" title='Title' description='Description' imageUrl='' story='Story' date='Date' location='Location' time='Time' />
                    <MoreNewsBlock key="1" title='Title' description='Description' imageUrl='' story='Story' date='Date' location='Location' time='Time' /> */}
                </div>
            </div>

            <Footer/>
        </>
    )

} 