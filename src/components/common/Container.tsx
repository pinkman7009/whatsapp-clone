import { ReactNode, ReactElement } from "react";
import { ChildrenProps as ContainerProps } from "../../types";

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[1700px] mx-auto">{children}</div>;
};
