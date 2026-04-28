import { FaSun, FaCloud } from "react-icons/fa6"
import { FaAngleRight } from "react-icons/fa6"
import { IoMdSearch } from "react-icons/io"
import Footer from "../components/footer"

function weather() {
    return (
        <>

            <div className="h-5 mx-5 md:mx-10 md:mb-10 mt-0 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Weather<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>
            

            <div className="w-[90vw] mx-auto my-4 flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0">
                {/* <div> */}
                <div className="w-full h-[90vh] max-h-[400px] md:max-h-full bg-gray-400 relative rounded-md">
                    <div className="absolute right-5 md:bottom-0 flex flex-col md:flex-row justify-evenly h-full md:h-fit md:w-full text-white">
                        <div className="flex flex-row-reverse md:flex-col items-center"><FaSun/> Temperature:--</div>
                        <div className="flex flex-row-reverse md:flex-col items-center"><FaSun/> Humidity:--</div>
                        <div className="flex flex-row-reverse md:flex-col items-center"><FaSun/> Feels Like:--</div>
                        <div className="flex flex-row-reverse md:flex-col items-center"><FaCloud/> 8:00PM</div>
                    </div>
                </div>
                {/* </div> */}
                <div className="w-[90vw] md:w-[20vw] md:h-[90vh] overflow-x-auto md:overflow-x-hidden overflow-y-hidden md:overflow-auto">
                    {/* my-5 w-[93vw] md:w-[90vw] mx-auto h-[60vh] max-h-[300px] md:max-h-[600px] rounded-md overflow-x-auto overflow-y-hidden bg-[var(--offbg)] */}
                    <div className="w-max md:w-full h-full md:h-max flex flex-row md:flex-col space-y-4 space-x-4">
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">6:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">7:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">8:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">9:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">10:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">11:00AM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">12:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">1:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">2:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">3:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">4:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">5:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">6:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">7:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">8:00PM</span></div>
                        <div className="bg-gray-400 rounded-md w-20 md:w-full md:h-[100px] h-[50px] p-3 text-xs flex items-center justify-center"><span className="mt-16">9:00PM</span></div>
                    </div>
                </div>
            </div>

            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Weather In Other States<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>
            
            <div className="w-[90vw] mx-auto py-4 flex justify-between">
                <div className="w-[49%] grid grid-cols-2 gap-2 md:gap-5">
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Abuja</div>
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Oyo</div>
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Kano</div>
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Delta</div>
                </div>
                <div className="w-[49%] grid grid-cols-2 gap-2 md:gap-5">
                    <div className="h-[100px] col-span-2">
                        <div className="relative">
                            <input className='border border-2 w-full h-10 rounded-md p-2 text-sm md:text-md border-[var(--tertiary)]' type="search" placeholder="Search States..." />
                            <IoMdSearch className="absolute top-[50%] right-0 text-white w-[30%] md:w-[10%] h-10 py-2 cursor-pointer translate-y-[-50%] bg-[var(--tertiary)] rounded-md" />
                        </div>
                    </div>
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Jos</div>
                    <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Port Harcourt</div>
                </div>
            </div>


            <div className="h-5 mx-5 md:mx-10 md:my-10 my-5 border-b-2 border-[var(--secondary)]"><span className="bg-white md:text-xl text-[var(--tertiary)]">Weather For Other Days<FaAngleRight className="inline text-[var(--secondary)]" /></span></div>

            <div className="w-[90vw] mx-auto py-4 md:flex space-x-4 justify-evenly overflow-x-auto md:overflow-hidden">
                <div className="w-max md:w-full p-4 flex space-x-4">
                    <div className="bg-gray-400 rounded-md md:w-full w-20 h-[50px] md:h-[100px] flex items-center justify-center"><span className="mt-20 md:mt-0">Tuesday</span></div>
                    <div className="bg-gray-400 rounded-md md:w-full w-20 h-[50px] md:h-[100px] flex items-center justify-center"><span className="mt-20 md:mt-0">Wednesday</span></div>
                    <div className="bg-gray-400 rounded-md md:w-full w-20 h-[50px] md:h-[100px] flex items-center justify-center"><span className="mt-20 md:mt-0">Thursday</span></div>
                    <div className="bg-gray-400 rounded-md md:w-full w-20 h-[50px] md:h-[100px] flex items-center justify-center"><span className="mt-20 md:mt-0">Friday</span></div>
                    <div className="bg-gray-400 rounded-md md:w-full w-20 h-[50px] md:h-[100px] flex items-center justify-center"><span className="mt-20 md:mt-0">Saturday</span></div>
                </div>
                {/* <div className="bg-gray-400 rounded-md w-full h-[100px] flex items-center justify-center">Saturday</div> */}
            </div>



            <Footer />
        </>
    )
}

export default weather