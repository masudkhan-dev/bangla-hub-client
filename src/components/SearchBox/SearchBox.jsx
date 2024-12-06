import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { axiosPublic } from "../../hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["word-meaning"],
    queryFn: async () => {
      const res = await axiosPublic.get("/words");
      return res.data;
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredData([]);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const results = data
        ? data.flatMap((item) =>
            Object.values(item)
              .flat()
              .filter(
                (entry) =>
                  (entry.word &&
                    entry.word.toLowerCase().includes(lowercasedQuery)) ||
                  (entry.meaning &&
                    entry.meaning.toLowerCase().includes(lowercasedQuery))
              )
          )
        : [];
      setFilteredData(results);
    }
  }, [query, data]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery("");
    setFilteredData([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleItemClick = (word) => {
    if (inputRef.current) {
      inputRef.current.blur();
    }

    setQuery(word);
    setIsOpen(false);

    // Remove highlight from the previous word
    if (highlightedWord) {
      const prevElement = document.querySelector(
        `[data-word="${highlightedWord}"]`
      );
      if (prevElement) {
        prevElement.classList.remove("highlight");
      }
    }

    // Set the new highlighted word
    setHighlightedWord(word);

    const targetElement = document.querySelector(`[data-word="${word}"]`);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        targetElement.classList.add("highlight");
        setTimeout(() => {
          targetElement.classList.remove("highlight");
          setHighlightedWord(null);
        }, 20000);
      }, 300);
    }
  };

  if (isLoading) {
    return <p className="text-center">Searching..</p>;
  }

  if (isError) {
    return (
      <div className="text-red-500 w-full max-w-[300px] mx-auto">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="w-full max-w-[300px] mx-auto">No words found.</div>;
  }

  return (
    <div className="relative w-[280px] md:w-[600px] mx-auto" ref={searchRef}>
      <div className="flex items-center border border-gray-300 rounded-md bg-white/90 w-full py-1 md:py-0.5 kobita">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow py-2 px-4 outline-none text-sm sm:text-base truncate"
          placeholder="Search words or meanings..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />

        <button
          className="px-4 text-[#726ee4]"
          onClick={query ? handleClearSearch : null}
        >
          {query ? <X size={20} /> : <Search size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white/90 border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto kobita">
          {filteredData.length > 0 ? (
            <ul className="py-1">
              {filteredData.map((entry, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base truncate"
                  onClick={() => handleItemClick(entry.word)}
                >
                  <strong>{entry.word.toUpperCase()}</strong>:{" "}
                  {entry.meaning.replace(/\b\w/g, (i) => i.toUpperCase())}
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-2 text-gray-500 text-sm sm:text-base">
              No Results Found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
