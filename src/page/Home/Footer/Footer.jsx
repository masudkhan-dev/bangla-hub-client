import { Link } from "react-router";

const Footer = () => {
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <footer className="bg-[#C9C7F8] mt-10 rounded">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <button
              onClick={handleTop}
              className="font-bold text-xl text-[#003653]"
            >
              Bangla Hub
            </button>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024 - {new Date().getFullYear()} All rights
              reserved by{" "}
              <Link to="/admin" className="font-bold">
                Kobita
              </Link>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
