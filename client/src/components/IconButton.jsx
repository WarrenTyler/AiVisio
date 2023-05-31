const IconButton = ({ onClick, icon, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <img src={icon} alt={text} className="w-6 h-6" />
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
