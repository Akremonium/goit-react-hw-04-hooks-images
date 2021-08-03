import { useState } from "react";
import Modal from "../Modal";

const ImageGalleryItem = ({ smallImage, largeImage, id, tags }) => {
  const [largeImg, setLargeImg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((state) => !state);
  };

  const onImgClick = (largeImg) => {
    setLargeImg(largeImg);
    toggleModal();
  };

  return (
    <>
      <li
        className="ImageGalleryItem"
        key={id}
        id={id}
        onClick={() => onImgClick(largeImage)}
      >
        <img src={smallImage} alt={tags} className="ImageGalleryItem-image" />
      </li>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt="" />
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;
