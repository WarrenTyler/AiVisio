const UserInitial = ({ name }) => {
  const initial = name ? name[0] : "";

  return (
    <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
      {initial}
    </div>
  );
};

export default UserInitial;
