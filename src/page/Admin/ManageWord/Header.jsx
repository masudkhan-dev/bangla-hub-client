import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <h2 className="text-2xl font-bold my-4 text-center kobita">
          Manage Words
        </h2>
      </Link>
    </div>
  );
};

export default Header;
