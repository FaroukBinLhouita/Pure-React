/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const dataMenu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {dataMenu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.pizzaId} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
