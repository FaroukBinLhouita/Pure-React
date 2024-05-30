import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrderID() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query) return;
    navigate(`/order/${query}`);

    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="md:px-6 md:py-3 px-4 py-2
        border border-stone-200
        bg-stone-200/80 
        rounded-full focus:outline-none 
        "
        value={query}
        placeholder="search for your order"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrderID;
