import { useQuery } from "@tanstack/react-query";
import WMCard from "../../../components/WMCard/WMCard";
import WMTitle from "../../../components/WMTitle/WMTitle";
import { axiosPublic } from "../../../hooks/axiosPublic";
import Loader from "../../../utility/Loader/Loader";

const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const WordMeaning = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["word-meaning"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/words");
        return res.data;
      } catch (err) {
        console.error("Failed to fetch words:", err);
        throw err;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error:{" "}
        {error instanceof Error
          ? error.message
          : "An unexpected error occurred"}
      </div>
    );
  }

  refetch();

  const categoryMap = new Map();
  data.forEach((categoryObj) => {
    const category = Object.keys(categoryObj).find(
      (key) => key !== "_id" && ALPHABET.includes(key)
    );

    if (category && categoryObj[category].length > 0) {
      categoryMap.set(category, categoryObj[category]);
    }
  });

  // Add some custom CSS for highlighting
  const highlightStyle = `
    <style>
      .highlight {
        background-color: #fcff3298;
        transition: background-color 1s ease;
      }
    </style>
  `;

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: highlightStyle }} />
      <div>
        {ALPHABET.map((letter) => {
          const categoryData = categoryMap.get(letter);

          if (categoryData && categoryData.length > 0) {
            return (
              <div key={letter}>
                <WMTitle title={letter} data={data} />
                {categoryData.map((item) => (
                  <div key={item.id} data-word={item.word}>
                    <WMCard word={item.word} meaning={item.meaning} />
                  </div>
                ))}
              </div>
            );
          }

          return null;
        })}

        {categoryMap.size === 0 && (
          <div className="text-center text-gray-500 bg-[#fcff3298] p-4">
            No words have been added yet.
          </div>
        )}
      </div>
    </>
  );
};

export default WordMeaning;
