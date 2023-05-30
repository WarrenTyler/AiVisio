import { UserInitial } from "../components";

const UserInfo = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
      <UserInitial name={name} />
      <p className="text-white text-sm">{name}</p>
    </div>
  );
};

export default UserInfo;
