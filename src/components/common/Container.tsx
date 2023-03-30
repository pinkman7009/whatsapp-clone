import { ReactNode, ReactElement } from "react";

interface ContainerProps {
  children: ReactNode | ReactElement;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[1700px] mx-auto">{children}</div>;
};
