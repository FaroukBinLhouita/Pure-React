import { useSelector } from "react-redux";

function Username() {
  const { userName } = useSelector((state) => state.user);

  return (
    <div className="md:block font-semibold text-sm hidden">{userName}</div>
  );
}

export default Username;
