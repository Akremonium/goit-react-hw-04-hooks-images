import { useState, useEffect } from "react";

import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Error from "../Error";
import Loader from "../Loader";

import api from "../../Api/api";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const ImageGallery = ({ query }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(Status.PENDING);

    api.apiServise(query, page).then((response) => {
      if (response.hits.length !== 0) {
        setImages((images) => [...images, ...response.hits]);
        setStatus(Status.RESOLVED);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        setPage(1);
        setImages([]);
        setStatus(Status.REJECTED);
      }
    });
  }, [page, query]);

  const onLoadMore = () => {
    setPage((page) => page + 1);
  };

  if (status === "idle") {
    return <div className="start">☝</div>;
  }

  if (status === "resolved" && images.length !== 0) {
    return (
      <>
        <ul className="ImageGallery">
          {images.map((image) => (
            <ImageGalleryItem
              key={image.webformatURL}
              smallImage={image.webformatURL}
              largeImage={image.largeImageURL}
              id={image.id}
              tags={image.tags}
            />
          ))}
        </ul>
        {images.length > 0 && <Button onClick={onLoadMore} />}
      </>
    );
  }

  if (status === "pending") {
    return (
      <div className="wrapperLoader">
        <Loader />
      </div>
    );
  }
  if (status === "rejected") {
    return <Error query={query} />;
  }
};

export default ImageGallery;
