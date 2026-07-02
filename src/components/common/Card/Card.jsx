import { cx } from "../../../utils/classNames.js";
import "./Card.css";

export default function Card({ className, children, padded = true, ...rest }) {
  return (
    <div className={cx("card", padded && "card--padded", className)} {...rest}>
      {children}
    </div>
  );
}
