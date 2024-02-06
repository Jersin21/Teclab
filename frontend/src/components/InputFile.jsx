// InputFile.js
import React, { useState } from "react";
import styled from "styled-components";

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

const InputFile = ({ onChange, onImagesChange,analisisids }) => {
  const [files, setFiles] = useState([]);
  const generateUniqueId = () => {
    return `file-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const filesArray = selectedFilesArray

    setFiles((prevFiles) => [...prevFiles, ...filesArray]);

    onChange([...files, ...filesArray]);
    onImagesChange([...files, ...filesArray]);
  };

  const handleRemoveFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <FileInputContainer>
      <FileInputLabel>
        Seleccionar archivos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          name="images"
        />
      </FileInputLabel>
      {files.map((file) => (
        <div key={file.id}>
          <p>{file.name}</p>
          <RemoveButton onClick={() => handleRemoveFile(file.id)}>
            Eliminar
          </RemoveButton>
        </div>
      ))}
    </FileInputContainer>
  );
};

export default InputFile;
