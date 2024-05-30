import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UptadeQuantityButton from "./UptadeQuantityButton";
import { getCurrentQuantityId } from "./cartSlice";
import { useSelector } from "react-redux";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityId(pizzaId));

  return (
    <li className="py-3  sm:flex sm:justify-between sm:items-center">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="sm:gap-6 flex justify-between items-center">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UptadeQuantityButton id={pizzaId} quantity={currentQuantity} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape(
    PropTypes.shape({
      name: PropTypes.string,
      pizzaId: PropTypes.number,
      quantity: PropTypes.number,
      totalPrice: PropTypes.number,
    })
  ),
};

export default CartItem;
