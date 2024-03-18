import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FileInputLabel = styled.label`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 15px;
`;

const RemoveButton = styled.button`
  padding: 5px;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
`;

const InputFile = ({ onChange, onImagesChange, analisisids }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const inputRef = useRef(null);
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };

  const handleFileChange = async (e) => {
    e.preventDefault();

    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const existingFiles = selectedFilesArray.filter(
      (file) => files.some((f) => f.name === file.name)
    );

    if (existingFiles.length > 0) {
      toast.error(
        "Una o más imágenes seleccionadas ya existen en la lista.",
        toastOptions
      );
      return;
    }


    const isValidFileType = selectedFilesArray.every((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );

    const isValidFileSize = selectedFilesArray.every(
      (file) => file.size / 1024 / 1024 < 3
    );

    if (!isValidFileType) {
      toast.error(
        "Solo se permiten archivos de tipo imagen (JPEG, PNG, ETC.).",
        toastOptions
      );
      return;
    }

    if (!isValidFileSize) {
      toast.error(
        "El tamaño máximo permitido para las imágenes es de 5MB.",
        toastOptions
      );
      return;
    }

    if (files.length + selectedFilesArray.length > 5) {
      toast.error("No puedes seleccionar más de 5 archivos.", toastOptions);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    const filesArray = selectedFilesArray;

    setFiles([...files, ...filesArray]);
    setSelectedFileNames([...selectedFileNames, ...selectedFilesArray]);

    onChange([...files, ...filesArray]);
    onImagesChange([...files, ...filesArray]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((file, idx) => idx !== index);
    setFiles(updatedFiles);
    setSelectedFileNames(selectedFileNames.filter((_, idx) => idx !== index));
    onChange(updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <FileInputContainer>
      <FileInputLabel>
        Seleccionar archivos
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          name="images"
        />
      </FileInputLabel>
      {files.map((file, index) => (
        <div key={index}>
          <p>{file.name}</p>
          <RemoveButton type="button" onClick={() => handleRemoveFile(index)}>
            Eliminar
          </RemoveButton>
        </div>
      ))}
    </FileInputContainer>
  );
};

export default InputFile;
