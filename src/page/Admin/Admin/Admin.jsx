import { useEffect } from "react";
import { Edit3, PlusCircle } from "lucide-react";
import { Link } from "react-router";

const Admin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#d4ebf8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <Link to="/">
          <div className="py-8 space-y-2 text-center transition-all duration-300 hover:shadow-lg bg-[#c9c7f8]">
            <h2 className="text-2xl md:text-4xl font-bold text-[#003653] kobita">
              Admin Panel
            </h2>
            <p className="text-base text-[#003653]/70 kobita">
              Empower your linguistic journey by managing and expanding the
              Banglish Dictionary.
            </p>
          </div>
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* add word */}
          <div className="group transition-all duration-300 hover:shadow-lg bg-[#c9c7f8] p-8">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-[#d4ebf8] p-3 transition-transform group-hover:rotate-12">
                <PlusCircle className="h-4 w-4 md:h-6 md:w-6 text-[#003653] bg-[#d4ebf8]" />
              </div>
              <h2 className="font-bold text-2xl md:text-3xl kobita">
                Add New Word
              </h2>
            </div>

            <div>
              <p className="text-base text-[#003653]/70 my-4 kobita">
                Contribute to the dictionary by introducing new Banglish terms
                and their meanings.
              </p>
              <Link to="/addWord">
                <button className="cursor-pointer transition-all bg-indigo-400 text-[#003653] px-6 py-3.5 rounded-lg border-indigo-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  kobita w-full">
                  Add Word
                </button>
              </Link>
            </div>
          </div>

          {/* Manage word */}
          <div className="group transition-all duration-300 hover:shadow-lg bg-[#c9c7f8] p-8">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-[#d4ebf8] p-3 transition-transform group-hover:rotate-12">
                <Edit3 className="h-4 w-4 md:h-6 md:w-6 text-[#003653] bg-[#d4ebf8]" />
              </div>
              <h2 className="font-bold text-2xl md:text-3xl kobita">
                Manage Words
              </h2>
            </div>
            <div>
              <p className="text-base text-[#003653]/70 my-4 kobita">
                Edit, review, and curate the existing collection of Banglish
                words in our dictionary.
              </p>
              <Link to="/manageWord">
                <button className="cursor-pointer transition-all bg-indigo-400 text-[#003653] px-6 py-3.5 rounded-lg border-indigo-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]  kobita w-full">
                  Manage Words
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
