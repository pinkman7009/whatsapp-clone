interface IUser {
  key: string | null;
  userDetails: {
    online: {
      online: boolean;
      displayName: string;
    };
  };
}

interface ISearchbarProps {
  users: IUser[];
}
export const Searchbar = ({ users }: ISearchbarProps) => {
  return (
    <div className="w-full">
      <input type="text" placeholder="Search users" />
    </div>
  );
};
