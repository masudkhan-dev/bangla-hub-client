import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/axiosPublic";
import Loader from "@/utility/Loader/Loader";
import { Link } from "react-router";
import InfoBar from "./InfoBar";
import WordTable from "./WordTable";
import Pagination from "./Pagination";
import Alert from "@/utility/Alert/Alert";

const ITEMS_PER_PAGE = 10;

export default function ManageWord() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["word-meaning"],
    queryFn: async () => {
      const res = await axiosPublic.get("/words");
      return res.data;
    },
  });

  const handleDelete = (category, id) => {
    Alert.fire({
      type: "delete",
      title: "Delete Item?",
      text: "Are you sure you want to delete this?",
      confirmButtonText: "Yes Delete",
      cancelButtonText: "Keep Item",
      onConfirm: async () => {
        try {
          const res = await axiosPublic.delete(`/words/${category}/${id}`);
          if (res.data.success) {
            Alert.fire({
              type: "success",
              title: "Deleted Successful",
              text: "Your word was deleted",
            });
            refetch();
          }
        } catch (err) {
          Alert.fire({
            type: "error",
            title: err.message,
            text: err.code,
          });
          console.error(err);
        }
      },
      onCancel: () => console.log("Deletion Cancelled"),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">No words found.</div>;
  }

  const categorizedData = {};
  data.forEach((categoryObj) => {
    const category = Object.keys(categoryObj).find((key) => key !== "_id");
    if (category) {
      if (!categorizedData[category]) {
        categorizedData[category] = [];
      }
      categorizedData[category].push(
        ...categoryObj[category].map((item) => ({ ...item, category }))
      );
    }
  });

  const flattenedData = Object.entries(categorizedData)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([category, items]) =>
      items.map((item, index) => ({
        ...item,
        serialNumber: `${category.charAt(0).toUpperCase()}${index + 1}`,
      }))
    );

  const totalWords = flattenedData.length;
  const totalPages = Math.ceil(totalWords / ITEMS_PER_PAGE);

  const paginatedData = flattenedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-[#d4ebf8]">
      <div className="container mx-auto p-4 ">
        <Link to="/">
          <h2 className="text-2xl font-bold my-4 text-center kobita">
            Manage Words
          </h2>
        </Link>
        <InfoBar totalWords={totalWords} />
        <WordTable
          paginatedData={paginatedData}
          handleDelete={handleDelete}
          data={data}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalWords={totalWords}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
