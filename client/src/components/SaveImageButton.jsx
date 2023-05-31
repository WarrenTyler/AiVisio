import { IconButton } from "../components";
import download from "./download.svg";

const SaveImageButton = ({ image }) => {
  const handleDownload = () => {
    downloadImage(image._id, image.photo);
  };

  return (
    <IconButton
      onClick={handleDownload}
      icon={download}
      text="Download"
      className="outline-none bg-transparent border-none"
    />
  );
};

export default SaveImageButton;
