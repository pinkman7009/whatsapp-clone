import { User } from "../../types";

interface ISearchbarProps {
  users: User[];
}
export const Searchbar = ({ users }: ISearchbarProps) => {
  return (
    <div className="w-full">
      <input type="text" placeholder="Search users" />
    </div>
  );
};
