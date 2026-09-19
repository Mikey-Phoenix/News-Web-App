import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { redirect } from "react-router-dom";
import logo from "../assets/footer_logo.png";


export default function Footer () {
    return (
        <>
            <div id="footer" className="w-full mt-24 md:mt-48 py-6 px-3 md:px-10 bg-(--tertiary) text-white">
                {/* <h1 className="text-3xl md:text-5xl font-bold">Logo</h1> */}
                <img src={logo} alt="Brand Name" width="300px" />
                <div className="grid grid-cols-3 gap-y-3 lg:flex justify-between lg:w-[50%] mt-5">
                    <a href="/" className="hover:text-[var(--secondary)]">Home</a>
                    <a href="/hot" className="hover:text-[var(--secondary)]">Hot</a>
                    <a href="/sports" className="hover:text-[var(--secondary)]">Sports</a>
                    <a href="/politics" className="hover:text-[var(--secondary)]">Politics</a>
                    <a href="/tech" className="hover:text-[var(--secondary)]">Tech</a>
                    <a href="/health" className="hover:text-[var(--secondary)]">Health</a>
                    <a href="/business" className="hover:text-[var(--secondary)]">Business</a>
                    <a href="/entertainment" className="hover:text-[var(--secondary)]">Entertainment</a>
                    <a href="/weather" className="hover:text-[var(--secondary)]">Weather</a>
                </div>
                <div className="flex flex-row md:flex-col justify-between mt-5 md:mt-0">
                    <div className="bg-(--primary) w-fit mt-5 md:mt-3 cursor-pointer p-2 rounded-md hover:bg-(--tertiary-light) text-sm">Subscribe to newsletter</div>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-3 w-[50%] lg:w-[30%] text-base"><span className="w-full text-center md:text-left">Follow Logo on:</span>
                        <div className="flex justify-evenly w-full">
                            <FaInstagram className="text-lg md:text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                            <FaFacebook className="text-lg md:text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                            <FaXTwitter className="text-lg md:text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                            <FaTiktok className="text-lg md:text-2xl cursor-pointer hover:text-[var(--secondary)]" />
                            <BiLogoGmail className="text-lg md:text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                        </div>
                    </div>
                </div>
                <div className="w-full h-5 pb-5 border-b-2 border-[var(--secondary)]"></div>
                <div className="flex flex-wrap mt-3 text-xs md:text-sm text-gray-500">
                    <div className="pr-5">Terms of</div> Use
                    <div className="pr-5">Subscription Terms</div>
                    <div className="pr-5">About the BBC</div>
                    <div className="pr-5">Privacy Policy</div>
                    <div className="pr-5">Cookies</div>
                    <div className="pr-5">Accessibility Help</div>
                    <div className="pr-5">Contact the BBC</div>
                    <div className="pr-5">Advertise with us</div>
                    <div className="pr-5">Do not share or sell my info</div>
                    <div className="pr-5">BBC.com Help & FAQs</div>
                    <div className="pr-5">Content Index</div>
                    <div className="pr-5">Set Preferred Source</div>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-3">Copyright 2026 Logo. All rights reserved. The Logo is not responsible for the content of external sites. Read about our approach to external linking.</p>
            </div>
        </>
    )
}