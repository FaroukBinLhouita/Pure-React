/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import { addItem, getCurrentQuantityId } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UptadeQuantityButton from "../cart/UptadeQuantityButton";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityId(id));

  const inCart = currentQuantity > 0;
  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      totalPrice: unitPrice + 1,
      unitPrice,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col pt-0.5 grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 italic capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex justify-between  items-center">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {inCart && (
            <div className="flex gap-3 sm:gap-8  items-center">
              <UptadeQuantityButton id={id} quantity={currentQuantity} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !inCart && (
            <Button clickOn={handleAddItem} type="small">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      unitPrice: PropTypes.string,
      ingredients: PropTypes.arrayOf,
      soldOut: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ),
};

export default MenuItem;
