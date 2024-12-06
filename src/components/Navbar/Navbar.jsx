import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import logo from "/logo2.png";
import { Link } from "react-router";
import Clock from "../Clock/Clock";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    setIsScrolling(window.scrollY > 50);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-2 md:px-8 bg-[#C9C7F8] border-b border-[#f2f2f2] ${
        isScrolling ? "shadow-xl bg-[#d4ebf8]" : "shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center my-3 ">
        <Link to="/" onClick={handleTop} className="flex items-center gap-x-2 ">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-10 h-auto object-contain"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1.3 }}
          />
          <motion.h2
            className="text-3xl hidden md:block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            Bangla Hub
          </motion.h2>
        </Link>

        <button
          onClick={handleTop}
          className="hidden md:block text-[#3333334d] cursor-pointer "
        >
          <Clock />
        </button>

        <div className="">
          <SearchBox />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
