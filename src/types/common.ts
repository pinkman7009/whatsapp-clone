import { ReactNode, ReactElement } from "react";

export interface Button {
  text: string;
  handleClick: () => void;
  size: "small" | "large" | "medium";
}

export interface ChildrenProps {
  children: ReactNode | ReactElement;
}
