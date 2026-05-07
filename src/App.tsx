import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from "./pages/home"
import Tech from "./pages/tech"
import Sports from "./pages/sports"
import Health from "./pages/health"
import Business from "./pages/business"
import Entertainment from "./pages/entertainment"
import Politics from "./pages/politics"
import Hot from "./pages/hot"
import Weather from "./pages/weather"
import Article from "./pages/article"
import { IoMdSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { useState, useEffect, useCallback } from 'react';


// ── toggle hook (same file, no import needed) ──────────────────
function useToggle(initial: boolean = false) {
  const [isOn, setIsOn] = useState<boolean>(initial);
  const toggle = useCallback(() => setIsOn(v => !v), []);
  return { isOn, toggle };
}
// ───────────────────────────────────────────────────────────────

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [screenSize, setScreenSize] = useState(false)
  const { isOn, toggle } = useToggle()
  const [mobileSearch, setMobileSearch] = useState(true)

  const searchBar = () => {
    setMobileSearch(prev => !prev)
  }

  function redirect(url:string){
    window.location.href = url;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    const handleSize = () => {
      if (window.innerWidth > 768) {
        setScreenSize(prev => !prev)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/hot', label: 'Hot' },
    { to: '/sports', label: 'Sports' },
    { to: '/politics', label: 'Politics' },
    { to: '/tech', label: 'Tech' },
    { to: '/health', label: 'Health' },
    { to: '/business', label: 'Business' },
    { to: '/entertainment', label: 'Entertainment' },
    { to: '/weather', label: 'Weather' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-between bg-[var(--primary)] text-white">

        {/* Top section - slides up when scrolled */}

        {screenSize ? (
          <div className={`w-full flex justify-between items-center space-x-4 px-4 overflow-hidden transition-all duration-300 ease-in-out ${scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-24 py-4 opacity-100'}`}>
            <div className="hidden md:block relative">
              <input className='border border-2 rounded-md p-2 border-[var(--tertiary)]' type="search" placeholder="Search..." />
              <IoMdSearch className="absolute top-[50%] right-0 w-[30%] h-full py-2 cursor-pointer translate-y-[-50%] bg-[var(--tertiary)] rounded-md" />
            </div>
            <div className="text-3xl md:text-5xl font-bold">Logo</div>

            {/* Hamburger — opens mobile menu */}
            <div
              onClick={toggle}   // ✅ wired to toggle
              className="md:hidden bg-[var(--tertiary)] rounded-sm text-2xl p-3 cursor-pointer hover:bg-[var(--tertiary-light)]"
            >
              <RxHamburgerMenu />
            </div>

            <div className="hidden md:block bg-[var(--tertiary)] cursor-pointer p-2 rounded-md hover:bg-[var(--tertiary-light)]">Subscribe to newsletter</div>
          </div>
          ) : (
            <div className={`w-full flex justify-between items-center space-x-4 px-4 overflow-hidden transition-all duration-300 ease-in-out max-h-24 py-4 opacity-100`}>
              <div className="hidden md:block relative">
                <input className='border border-2 rounded-md p-2 border-[var(--tertiary)]' type="search" placeholder="Search..." />
                <IoMdSearch className="absolute top-[50%] right-0 w-[30%] h-full py-2 cursor-pointer translate-y-[-50%] bg-[var(--tertiary)] rounded-md" />
              </div>
              <div className="text-3xl md:text-5xl font-bold">Logo</div>

              {/* Hamburger — opens mobile menu */}
              <div
                onClick={toggle}   // ✅ wired to toggle
                className="md:hidden bg-[var(--tertiary)] rounded-sm text-2xl p-3 cursor-pointer hover:bg-[var(--tertiary-light)]"
              >
                <RxHamburgerMenu />
              </div>

              <div className="hidden md:block bg-[var(--tertiary)] cursor-pointer p-2 rounded-md hover:bg-[var(--tertiary-light)]">Subscribe to newsletter</div>
            </div>
          )}

        {/* Links bar - always visible */}
        <div className="hidden md:flex items-center justify-center w-full">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to
                ? 'py-2 px-4 bg-[var(--tertiary)]'
                : 'text-white py-2 px-4 hover:text-[var(--secondary)]'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu - slides in from the right */}
        {isOn ? (   // ✅ isOn is now defined
          <div className="absolute top-0 right-0 w-[100vw] h-[100vh] p-10 flex flex-col bg-[var(--primary)]">
            <div className="flex justify-between items-center mb-5">
              {mobileSearch && (
                <div className="w-full mr-2 text-3xl font-bold">Logo</div>
              )}
              <div className="flex justify-end space-x-4 w-full">
                  {!mobileSearch ? (
                    <div className="relative w-full md:hidden flex rounded-sm cursor-pointer " onClick={searchBar}>
                        <input className='border border-2 rounded-md px-2 border-[var(--tertiary)]' type="search" placeholder="Search..." />
                        <IoMdSearch className='absolute top-[50%] right-0 w-[30%] h-full py-2 cursor-pointer translate-y-[-50%] bg-[var(--tertiary)] rounded-md' />
                    </div>
                  ) : (
                    <div className="md:hidden flex rounded-sm cursor-pointer text-2xl " onClick={searchBar}>
                        <IoMdSearch className='w-full h-full p-3 cursor-pointer bg-[var(--tertiary)] rounded-md' />
                    </div>
                  )}
                {/* Close button — closes mobile menu */}
                <div
                  onClick={toggle}   // ✅ wired to toggle
                  className="md:hidden bg-[var(--tertiary)] rounded-sm text-2xl p-3 cursor-pointer hover:bg-[var(--tertiary-light)]"
                >
                  <IoClose />
                </div>
              </div>
            </div>

            <div>
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={toggle}   // ✅ closes menu on nav
                  className={location.pathname === link.to
                    ? 'flex items-center h-10 pl-2 bg-[var(--tertiary)] w-full'
                    : 'text-white flex items-center h-10 pl-2 hover:text-[var(--secondary)] w-full'
                  }>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="w-fit absolute bottom-10">
              <div className="text-3xl font-bold">Logo</div>
              <div className="flex items-center justify-between mt-3 space-x-6 text-base">
                <FaInstagram className="text-2xl cursor-pointer hover:text-[var(--secondary)]" />
                <FaFacebook className="text-2xl cursor-pointer hover:text-[var(--secondary)]" />
                <FaXTwitter className="text-2xl cursor-pointer hover:text-[var(--secondary)]" />
                <FaTiktok className="text-2xl cursor-pointer hover:text-[var(--secondary)]" />
                <BiLogoGmail className="text-2xl cursor-pointer hover:text-[var(--secondary)]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 -right-[100vw] w-[100vw] h-[100vh] p-10 flex flex-col bg-[var(--primary)]">
            <div className="flex justify-between items-center mb-5">
              {mobileSearch && (
                <div className="w-full mr-2 text-3xl font-bold">Logo</div>
              )}
              <div className="flex justify-end space-x-4 w-full">
                {!mobileSearch ? (
                    <div className="relative md:hidden flex rounded-sm cursor-pointer " onClick={searchBar}>
                        <input className='border border-2 rounded-md px-2 border-[var(--tertiary)]' type="search" placeholder="Search..." />
                        <IoMdSearch className='absolute top-[50%] right-0 w-[30%] h-full py-2 cursor-pointer translate-y-[-50%] bg-[var(--tertiary)] rounded-md' />
                    </div>
                ) : (
                  <div className="md:hidden flex rounded-sm cursor-pointer text-2xl " onClick={searchBar}>
                      <IoMdSearch className='w-full h-full p-3 cursor-pointer bg-[var(--tertiary)] rounded-md' />
                  </div>
                )}
                {/* Close button — closes mobile menu */}
                <div
                  onClick={toggle}   // ✅ wired to toggle
                  className="md:hidden bg-[var(--tertiary)] rounded-sm text-2xl p-3 cursor-pointer hover:bg-[var(--tertiary-light)]"
                >
                  <IoClose />
                </div>
              </div>
            </div>

            <div>
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={toggle}   // ✅ closes menu on nav
                  className={location.pathname === link.to
                    ? 'flex items-center h-10 pl-2 bg-[var(--tertiary)] w-full'
                    : 'text-white flex items-center h-10 pl-2 hover:text-[var(--secondary)] w-full'
                  }>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="w-fit absolute bottom-20">
              <div className="text-3xl font-bold">Logo</div>
              <div className="flex items-center justify-between mt-3 space-x-6 text-base">
                <FaInstagram className="text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                <FaFacebook className="text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                <FaXTwitter className="text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                <FaTiktok className="text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
                <BiLogoGmail className="text-2xl cursor-pointer hover:text-[var(--secondary)]" onClick={() => redirect("/")}/>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-12' : 'h-24 md:h-36'}`} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hot" element={<Hot />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/health" element={<Health />} />
        <Route path="/business" element={<Business />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

export default App