/** Joins truthy class names together: cx("a", false && "b", "c") -> "a c" */
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}
