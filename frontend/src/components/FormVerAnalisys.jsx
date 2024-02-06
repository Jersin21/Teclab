import React from "react";
import styled from "styled-components";
import { RViewer, RViewerTrigger } from "react-viewerjs";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #1a1a2e;
  color: white;

  label {
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: #292a44;
    color: white;
    box-sizing: border-box;
    resize: vertical;
  }

  .image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
  }

  .image {
    margin: 10px;
    cursor: pointer;
  }
`;


const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  cursor: pointer;
`;
const FormVerAnalisys = ({ analisys }) => {
  const images = analisys.images.map((image) => {
    const fullPath = `http://localhost:3030/${image.image_path}`;
    return {
      src: fullPath,
      alt: `Image ${image.id}`,
    };
  });

  return (
    <>
      <Form>
        <h2>{analisys.analisis.categorium.name}</h2>
        <br />
        <h3>{analisys.analisis.name}</h3>
        <br />
        <p>Detalles : {analisys.resultado.detalle}</p>
        <RViewer imageUrls={images}>
          {images.map((image, index) => (
            <RViewerTrigger key={index} index={index}>
              <StyledImage src={image.src} alt={image.alt} />
            </RViewerTrigger>
          ))}
        </RViewer>
      </Form>
    </>
  );
};

export default FormVerAnalisys;
