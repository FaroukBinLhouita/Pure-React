// Test ID: IIDSAT
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant.js";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex justify-between flex-wrap items-center gap-2">
        <h2 className="text-xl  font-semibold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span
              className="bg-red-500 text-red-50
            rounded-full text-sm font-semibold uppercase tracking-wide
            px-3 py-1"
            >
              Priority
            </span>
          )}
          <span
            className="px-3 py-1
           rounded-full uppercase tracking-wide text-sm
           font-semibold
            bg-green-500 text-green-50"
          >
            {status} order
          </span>
        </div>
      </div>

      <div
        className="flex flex-wrap
      gap-2 justify-between
      items-center bg-stone-200
      px-6 py-5
      "
      >
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-6 px-6 py-5 bg-stone-200">
        <p className="text-medium text-sm text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-medium text-sm text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}

export default Order;
