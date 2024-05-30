import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UptadeQuantityButton({ id, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center sm:gap-3 gap-2">
      <Button type="round" clickOn={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>

      <span className="text-sm font-medium">{quantity}</span>

      <Button type="round" clickOn={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
}

UptadeQuantityButton.propTypes = {
  id: PropTypes.number,
  quantity: PropTypes.number,
};

export default UptadeQuantityButton;
