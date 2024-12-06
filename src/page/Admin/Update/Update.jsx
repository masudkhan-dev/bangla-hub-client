import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/axiosPublic";
import Loader from "@/utility/Loader/Loader";
import Alert from "@/utility/Alert/Alert";
import { useForm } from "react-hook-form";
import { AlertCircle, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function Update() {
  const { category: initialCategory, id } = useParams();
  const navigate = useNavigate();
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing word details
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["word", initialCategory, id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/words/${initialCategory}/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      // Pre-fill form fields
      setValue("word", data.word);
      setValue("meaning", data.meaning);
      setValue("category", initialCategory);
      setCharCount(data.meaning.length);
    },
  });

  console.log(data);

  const onSubmit = async (formData) => {
    const wordData = {
      word: formData.word.trim(),
      meaning: formData.meaning.trim(),
      newCategory: formData.category,
    };

    try {
      const res = await axiosPublic.put(
        `/words/${initialCategory}/${id}`,
        wordData
      );

      if (res.data.success) {
        Alert.fire({
          type: "success",
          title: "Word Updated Successfully",
          text: res.data.message,
        });
        navigate("/manageWord");
      }
    } catch (err) {
      Alert.fire({
        type: "error",
        title: "Error",
        text: err.response?.data?.error || "Failed to update word",
      });
    }
  };

  refetch();

  // Loading and error states
  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No word found</div>;

  const handleMeaningChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="w-full mx-auto bg-[#d4ebf8]">
      <div className="  border-2 border-indigo-400 shadow-lg overflow-hidden md:mx-20 ">
        <header className="bg-[#D1A4FF] p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-[#2e6396] kobita">
            Update Word
          </h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          {/* Word Input */}
          <div className="space-y-2">
            <label
              htmlFor="word"
              className="block text-sm font-medium text-gray-700 transition-colors kobita"
            >
              Word
            </label>
            <div className="relative">
              <input
                defaultValue={data.word}
                id="word"
                type="text"
                placeholder="Enter word"
                className={`w-full bg-[#d4ebf8] px-4 py-3 border-2 border-indigo-300 rounded shadow-sm outline-none transition-all duration-300 kobita
                ${
                  errors.word
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                }`}
                {...register("word", {
                  required: "Word is required",
                  minLength: {
                    value: 1,
                    message: "Word must be at least 1 character long",
                  },
                  validate: (value) =>
                    value.trim().length > 0 || "Word cannot be just spaces",
                })}
              />
            </div>

            {errors.word && (
              <p className="mt-2 text-sm text-red-600 flex items-center kobita">
                <AlertCircle className="mr-2 h-4 w-4" />
                {errors.word.message}
              </p>
            )}
          </div>

          {/* Meaning Input */}
          <div className="space-y-2">
            <label
              htmlFor="meaning"
              className="flex justify-between text-sm font-medium text-gray-700 transition-colors kobita"
            >
              <span> Meaning</span>
              <span className="text-red-400">
                Please must use whitespace while typing...
              </span>
            </label>
            <div className="relative">
              <span className="absolute right-5 top-5 text-gray-400">
                {charCount}
              </span>

              <textarea
                defaultValue={data.meaning}
                id="meaning"
                placeholder="Describe the word's meaning"
                className={`w-full px-4 py-3  bg-[#d4ebf8] border-2 border-indigo-300 text-indigo-500 shadow-sm outline-none transition-all duration-300 min-h-[150px] kobita
                  ${
                    errors.meaning
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  }
                `}
                {...register("meaning", {
                  required: "Meaning is required",
                  minLength: {
                    value: 3,
                    message: "Meaning must be at least 3 characters long",
                  },
                  validate: (value) => {
                    // Check if any character is repeated 20 times or more
                    const repeatedCharRegex = /(.)\1{19,}/;
                    if (repeatedCharRegex.test(value)) {
                      return "Meaning cannot have the same character repeated 20 times or more";
                    }
                    return (
                      value.trim().length >= 3 ||
                      "Meaning cannot be just spaces"
                    );
                  },
                })}
                onChange={handleMeaningChange}
              />
            </div>
            {errors.meaning && (
              <p className="mt-2 text-sm text-red-600 flex items-center kobita">
                <AlertCircle className="mr-2 h-4 w-4" />
                {errors.meaning.message}
              </p>
            )}
          </div>

          {/* Category (Alphabet) Select */}
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 transition-colors kobita"
            >
              Alphabet Category
            </label>
            <div className="relative">
              <select
                defaultValue={initialCategory}
                id="category"
                className={`w-full bg-[#d4ebf8] px-4 py-3 border-2 border-indigo-400 rounded shadow-sm outline-none transition-all duration-300 appearance-none kobita
                ${
                  errors.category
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                }`}
                {...register("category", {
                  required: "Please select an alphabet",
                })}
              >
                <option value="" className="kobita hover:bg-indigo-500 ">
                  Select an Alphabet
                </option>
                {[
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
                ].map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <ChevronsUpDown />
              </div>
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="cursor-pointer transition-all bg-[#D1A4FF] text-[#003653] px-6 py-3.5 rounded border-[#CCB5FB] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] kobita w-full"
            >
              Update Word
            </button>
          </div>
        </form>

        <div className="px-8 pb-8">
          <Link to="/manageWord">
            <button className="cursor-pointer transition-all bg-red-500 text-white px-6 py-3.5 rounded border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full kobita">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
