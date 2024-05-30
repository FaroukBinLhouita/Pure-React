import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, to, clickOn, type = "primary", disabled = false }) {
  const base =
    " text-stone-800 text-sm bg-yellow-400 inline-block rounded-full uppercase font-semibold hover:bg-yellow-300 transition-colors tracking-wide duration-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const style = {
    primary: base + " px-4 py-3 md:px-6 md-4",
    small: base + " text-xs px-4 py-2 md:px-5 md:py-2.5",
    round: base + " text-sm px-2.5 py-1 md:px-3.5 md:py-2",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 active:text-stone-800 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5 focus:text-stone-300",
  };

  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );

  if (clickOn)
    return (
      <button onClick={clickOn} disabled={disabled} className={style[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}

Button.propTypes = {
  clickOn: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
