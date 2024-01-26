import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  margin-top: 5px;
`;

const AnalysisForm = ({ category, analysis }) => {
  const [resultado, setResultado] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...selectedImages]);

    const selectedPreviewImages = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...selectedPreviewImages,
    ]);
    console.log(selectedImages)
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviewImages = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreviewImages.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreviewImages);
  };

  

  return (
    <Form >
      <h2>{category} </h2>
      <label htmlFor={`resultado-${analysis.analisis.id}`}>{analysis.analisis.name}: </label>
      <textarea
        id={`resultado-${analysis.analisis.id}`}
        name={`resultado-${analysis.analisis.id}`}
        value={resultado}
        onChange={(e) => setResultado(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      
      {previewImages.map((preview, index) => (
        <div key={index}>
          <ImagePreview src={preview} alt={`Preview ${index}`} />
          <RemoveButton onClick={() => handleRemoveImage(index)}>
            Eliminar
          </RemoveButton>
        </div>
      ))}
    </Form>
  );
};

export default AnalysisForm;
