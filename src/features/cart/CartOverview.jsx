import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrize, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantityOfPizza = useSelector(getTotalCartQuantity);
  const totalPrize = useSelector(getTotalCartPrize);

  if (!totalQuantityOfPizza) return null;

  return (
    <div className="flex items-center justify-between sm:px-6 bg-stone-800 text-stone-200 uppercase p-4 text-sm md:text-base">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalQuantityOfPizza} pizzas</span>
        <span>{formatCurrency(totalPrize)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
