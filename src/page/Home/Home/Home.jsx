import { ArrowDown, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Banner from "../Banner/Banner";
import WordMeaning from "../WordMeaning/WordMeaning";

const Home = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="mt-24">
      <Banner />
      <WordMeaning />

      <motion.button
        onClick={isAtTop ? scrollToBottom : scrollToTop}
        className="fixed bottom-10 right-5 p-2 bg-white rounded-full cursor-pointer shadow-xl"
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 1.3 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10,
        }}
      >
        {isAtTop ? (
          <ArrowDown className="text-[#726ee4]" size={20} />
        ) : (
          <ArrowUp className="text-[#726ee4]" size={20} />
        )}
      </motion.button>
    </div>
  );
};

export default Home;
