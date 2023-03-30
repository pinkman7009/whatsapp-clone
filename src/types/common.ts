export interface Button {
  text: string;
  handleClick: () => void;
  size: "small" | "large" | "medium";
}
