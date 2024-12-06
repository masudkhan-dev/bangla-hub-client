import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../page/Home/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import Loader from "../../utility/Loader/Loader";

const Root = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="bg-[#d4ebf8]">
      <div className="w-[95%] mx-auto flex flex-col justify-center kobita ">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default Root;
