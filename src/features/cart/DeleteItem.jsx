import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import PropTypes from "prop-types";
import { delItem } from "./cartSlice";

function DeleteItem({ id }) {
  const dispatch = useDispatch();

  return (
    <Button clickOn={() => dispatch(delItem(id))} type="small">
      Delete
    </Button>
  );
}

DeleteItem.propTypes = {
  id: PropTypes.number,
};

export default DeleteItem;
