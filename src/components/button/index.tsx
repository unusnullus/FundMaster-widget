import type { ComponentChildren, FunctionalComponent } from "preact";
import styles from "./styles.css";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  children: ComponentChildren;
}

const BUTTON_VARIANTS = {
  primary: "primary-button",
  secondary: "secondary-button",
};

const Button: FunctionalComponent<ButtonProps> = ({
  disabled,
  variant = "primary",
  children,
  onClick,
}) => (
  <button
    disabled={disabled}
    className={`widget-button ${BUTTON_VARIANTS[variant]}`}
    onClick={onClick}
  >
    <style>{styles.toString()}</style>
    {children}
  </button>
);

export default Button;
