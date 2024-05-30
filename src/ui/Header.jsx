import { Link } from "react-router-dom";
import SearchOrderID from "../features/order/SearchOrderID";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between  sm:px-6 bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200">
      <Link to="/" className="tracking-widest">
        fast react pizza co.
      </Link>

      <SearchOrderID />
      <Username />
    </header>
  );
}

export default Header;
