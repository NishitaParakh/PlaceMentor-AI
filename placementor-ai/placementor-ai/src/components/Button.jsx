import { Link } from "react-router-dom";

/**
 * Reusable button used across the app.
 *
 * Props:
 * - variant: "primary" | "secondary" | "ghost"   (defaults to "primary")
 * - size:    "md" | "lg"                          (defaults to "md")
 * - to:      if provided, renders as a React Router <Link> instead of <button>
 * - block:   if true, stretches to fill its container
 * - icon:    optional lucide-react icon element, placed after the label
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  block = false,
  icon = null,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
