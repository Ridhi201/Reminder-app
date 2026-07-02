import { cx } from "../../../utils/classNames.js";
import "./Chip.css";

/** @param {{tone?: "neutral"|"cobalt"|"amber"|"green"|"coral"}} props */
export default function Chip({ tone = "neutral", children }) {
  return <span className={cx("chip", `chip--${tone}`)}>{children}</span>;
}
