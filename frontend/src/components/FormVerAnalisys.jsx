import React, { useState } from "react";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 300px;
  margin-right: 300px;
  padding: 20px;
  background-color: #1a1a2e;
  color: white;

  label {
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
    word-wrap: break-word;
  }

  p {
    width: 100%;
    text-align: center; /* Centra el texto horizontalmente */
    word-wrap: break-word; /* Permite que el texto se ajuste al ancho del form */
  }
`;

const StyledImageGallery = styled(ImageGallery)`
  .image-gallery-slide img {
    max-width: 100%;
    height: auto;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const FormVerAnalisys = ({ analisys }) => {
  const [showGallery, setShowGallery] = useState(false);

  const images = analisys.images.map((image) => ({
    original: `http://localhost:3030/${image.image_path}`,
    thumbnail: `http://localhost:3030/${image.image_path}`,
    originalAlt: `Image ${image.id}`,
    thumbnailAlt: `Thumbnail ${image.id}`,
    originalHeight: 600,
    originalWidth: 800,
    thumbnailHeight: 100,
    thumbnailWidth: 100,
  }));

  const toggleGallery = () => {
    setShowGallery(!showGallery);
  };

  return (
    <Form>
      <h2>{analisys.analisis.categorium.name}</h2>
      <br />
      <h3>{analisys.analisis.name}</h3>
      <br />
      <label>
        Detalles:
        <span>{analisys.resultado.detalle}</span>
      </label>{" "}
      <Button type="button" onClick={toggleGallery}>
        {showGallery ? "Dejar de ver" : "Ver imágenes"}
      </Button>
      <br />
      {showGallery && (
        <StyledImageGallery
          items={images}
          showNav={false}
          showPlayButton={false}
          showThumbnails={true}
          showFullscreenButton={true}
          thumbnailPosition="bottom"
          showBullets={true}
          onClose={toggleGallery}
        />
      )}
    </Form>
  );
};

export default FormVerAnalisys;
