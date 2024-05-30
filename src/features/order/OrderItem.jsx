import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";

// , isLoadingIngredients, ingredients
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div
        className="flex items-center 
      gap-4 text-sm justify-between"
      >
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm italic text-stone-500 capitalize ">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.shape(
    PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      totalPrice: PropTypes.number,
    })
  ),
  ingredients: PropTypes.arrayOf,
  isLoadingIngredients: PropTypes.bool,
};

export default OrderItem;
