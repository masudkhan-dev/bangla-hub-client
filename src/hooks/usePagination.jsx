import { useState, useEffect } from "react";
import { useLocation, useRouteError, useSearchParams } from "react-router";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function usePagination(initialPage = 1, totalPages) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const searchParams = useSearchParams();
  const router = useRouteError();
  const location = useLocation();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    } else {
      const storedPage = localStorage.getItem("currentPage");
      if (storedPage) {
        setCurrentPage(parseInt(storedPage, 10));
      }
    }
  }, [searchParams]);

  const updatePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      localStorage.setItem("currentPage", newPage.toString());
      const params = new URLSearchParams(searchParams);
      params.set("page", newPage.toString());
      router.push(`${location.pathname}?${params.toString()}`);
    }
  };

  return [currentPage, updatePage];
}
