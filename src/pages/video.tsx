// import React from 'react'
// import { useSearchParams } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
import Footer from '../components/footer'
import { FaAngleRight } from 'react-icons/fa6'
import VideoBlock from '../components/videoblock'

function Video() {
    // const [searchParams] = useSearchParams();
    // const story = searchParams.get('story');
    // const hasRunRef = useRef<string | null>(null);

    window.location.replace('/');

  return (
    <div className='mt-[-25px] bg-[var(--tertiary)] '>
        <div className='min-h-[50vh]'>
            <h1 className='text-lg md:text-4xl text-white font-bold w-fit mx-auto pt-7'>Video</h1>
            <div className='flex w-[90vw] h-[80vh] mx-auto mt-5'>
                <div className=' w-full'>
                    <video className='bg-white w-full h-[80%]' controls>
                        <source src='' type='video/mp4' />
                    </video>
                    <div className='text-white flex-col gap-y-2'>
                        <h1 className='text-2xl my-3 font-extrabold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                        <p className='font-semibold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio saepe non maiores ab facilis porro, earum vero recusandae incidunt autem magni cumque error ipsa nostrum, impedit provident, ad veniam suscipit!</p>
                        <p className='text-gray-400'>Date</p>
                    </div>
                </div>
                <div className='w-1/3 pl-5 h-[80vh] overflow-y-scroll'>
                    <h1 className='text-2xl text-white'>Explore More</h1>
                    <div className='border-b-2 border-[var(--secondary)] py-3 flex mt-3'>
                        <img src="" alt="" width="100px" height="100px" />
                        <p className='text-white text-xl ml-2'>Title</p>
                    </div>
                    <div className='border-b-2 border-[var(--secondary)] py-3 flex mt-3'>
                        <img src="" alt="" width="100px" height="100px" />
                        <p className='text-white text-xl ml-2'>Title</p>
                    </div>
                    <div className='border-b-2 border-[var(--secondary)] py-3 flex mt-3'>
                        <img src="" alt="" width="100px" height="100px" />
                        <p className='text-white text-xl ml-2'>Title</p>
                    </div>
                    <div className='border-b-2 border-[var(--secondary)] py-3 flex mt-3'>
                        <img src="" alt="" width="100px" height="100px" />
                        <p className='text-white text-xl ml-2'>Title</p>
                    </div>
                    <div className='border-b-2 border-[var(--secondary)] py-3 flex mt-3'>
                        <img src="" alt="" width="100px" height="100px" />
                        <p className='text-white text-xl ml-2'>Title</p>
                    </div>
                </div>
            </div>

             <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="text-white md:text-xl bg-[var(--tertiary)]">More Videos <FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

             <div className="my-5 w-[93vw] md:w-[90vw] mx-auto h-[60vh] max-h-[300px] lg:max-h-[600px] rounded-md overflow-x-auto overflow-y-hidden ">
                <div className="h-full w-max mt-5 px-8 md:px-16 py-4 flex">
                    {/* {uniqueVideoArticles.map((article:any, index:number) => ( */}
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                        <VideoBlock url="{article.imageUrl}" story="{article.story}" title="{article.title}" date="{article.date}" isWhite={false} />
                    {/* ))} */}
                </div>
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

export default Video