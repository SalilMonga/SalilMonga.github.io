import React from "react";
import clsx from "clsx";

export interface BoundedProps {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx(
          "mt-25 px-4 py-10 md:px-6 md:py-14 lg:py-16",
          className
        )}
        {...restProps}
      >
        <div className="mx-auto w-full">{children}</div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";
