import React from "react";
import { clsx } from "clsx";

export const ButtonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  TERTIARY: "tertiary",
};

export const ButtonSize = {
  SM: "btn-sm",
  XL: "btn-xl",
  L: "btn-lg",
};

const Button = ({
  className,
  children,
  icon,
  iconRight,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.XL,
  InnerContainerProps = {},
  ...restProps
}) => {
  const { className: innerClassName, ...restInnerContainerProps } = InnerContainerProps
  return (
    <button
      className={clsx(
        className,
        size,
        {
          "btn bg-red-600 text-white hover:bg-black hover:text-white": variant === ButtonVariant.PRIMARY,
          "btn bg-white text-black border-1 border-black hover:bg-black hover:text-white":
            variant === ButtonVariant.SECONDARY,
          "text-red-600 md:hover:text-black":
            variant === ButtonVariant.TERTIARY,
        }
      )}
      {...restProps}
    >
      <div className={clsx(innerClassName, "flex justify-center gap-2")} {...restInnerContainerProps}>
        {!iconRight && icon}
        {children}
        {iconRight && icon}
      </div>
    </button>
  );
};

export default Button;
