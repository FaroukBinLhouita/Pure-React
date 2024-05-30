import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrize } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    userName,
    position,
    address,
    error: errorAddress,
    status: StatusAddress,
  } = useSelector((state) => state.user);

  const cart = useSelector(getCart);
  const isEmpty = cart.length > 0;
  const isLoading = StatusAddress === "loading";
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrize);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!isEmpty) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? lets go!</h2>

      <Form method="POST">
        <div
          className="
        mb-5 flex gap-2 flex-col 
        sm:flex-row sm:items-center
        "
        >
          <label className="sm:basis-40">First Name</label>
          <input
            className="
            w-full border border-stone-200
          rounded-full md:px-6 md:py-3 
          py-2 px-4 focus:outline-none 
          focus:ring focus:ring-yellow-400
          placeholder:text-stone-400 
          transition-all duration-300 text-sm
          "
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div
          className="flex mb-5 flex-col 
        sm:flex-row sm:items-center gap-2"
        >
          <label className="sm:basis-32">Phone number</label>
          <div className="grow">
            <input
              className="w-full
              border border-stone-200
              rounded-full md:px-6 md:py-3 
              py-2 px-4 focus:outline-none 
              focus:ring focus:ring-yellow-400
              placeholder:text-stone-400 
              transition-all duration-300 text-sm
              "
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p
                className="bg-red-100 text-red-700
              text-xs text-center 
              mt-2 rounded-md
              "
              >
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div
          className="flex mb-5 relative flex-col 
        sm:flex-row sm:items-center
        gap-2"
        >
          <label className="sm:basis-32">Address</label>
          <div className="grow ">
            <input
              className="w-full
              relative border border-stone-200
             rounded-full md:px-6 md:py-3 
             py-2 px-4 focus:outline-none 
             focus:ring focus:ring-yellow-400
             placeholder:text-stone-400 
             transition-all duration-300 text-sm"
              type="text"
              name="address"
              disabled={isLoading}
              defaultValue={address}
              required
            />
          </div>

          {StatusAddress === "error" && (
            <p
              className="bg-red-100 text-red-700
              text-xs text-center 
              mt-2 rounded-md
              "
            >
              {errorAddress} error
            </p>
          )}

          {!position.latitude && !position.longitude && (
            <span className="absolute md:top-[5px] md:right-[5px] top-[3] right-[3px] z-50">
              <Button
                disabled={isLoading}
                type="small"
                clickOn={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Your Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400
          focus:outline-none 
          focus:ring 
          focus:ring-yellow-400 
          focus:ring-offset-2
          "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />{" "}
          <input
            type="hidden"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button disabled={isSubmitting || isLoading}>
            {isSubmitting
              ? `your order is submitting`
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = {};

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  if (!isValidPhone(order.phone))
    errors.phone = "please give your correct phone number, we might need it";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
