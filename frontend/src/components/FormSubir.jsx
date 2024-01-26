import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import FormAnalisysSubir from "./FormAnalisysSubir";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  analisysRoute,
  categoriasRoute,
  tipoanalisysRoute,
} from "../utils/APIroute";
import Sidebar from "./Sidebar";

const FormContainer = styled.div`
  margin-left: 250px; /* Ancho del Sidebar */
  margin-top: 30px; /* Ancho del Sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubirResultadoButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const FormSubir = () => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const toastOptions = {
    position: "top-right",
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: true,
    autoClose: 3000,
    theme: "dark",
  };
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [iddetalle,setIddetalle] = useState([])
  const [resultado, setResultado] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    async function fechAnalisis() {
      const res = await axios.get(`${categoriasRoute}/${params.id}`, config);
      setData(res.data);
    }
    fechAnalisis();
  }, []);

  const handleImageChange = (selectedImages) => {
    setImages((prevImages) => [...prevImages, ...selectedImages]);

    const selectedPreviewImages = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...selectedPreviewImages,
    ]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviewImages = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreviewImages.splice(index, 1);

    setImages(updatedImages);
    setPreviewImages(updatedPreviewImages);
  };
 setIddetalle(data.solicitud.solicituddetalles.map(detalle => detalle.id))
 console.log(iddetalle)
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${categoriasRoute}/${params.id}`,
        {
          resultado,
          images,
          iddetalle,
        },
        config
      );

      console.log(response);

      if (response.data.status === true) {
        toast.success("Resultados subidos con éxito", toastOptions);
      } else {
        toast.error("Error al subir resultados", toastOptions);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al subir resultados", toastOptions);
    }
  };

  return (
    <FormContainer>
      <Sidebar />
      <h1>Subir Resultado de Análisis</h1>
      {data.solicitud?.solicituddetalles?.map((detalle, index) => (
        <FormAnalisysSubir
          key={index}
          category={detalle.analisis.categorium.name}
          analysis={detalle}
          resultado={resultado}
          setResultado={setResultado}
          images={images}
          
          setImages={setImages}
          previewImages={previewImages}
          setPreviewImages={setPreviewImages}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
        />
      ))}
      <SubirResultadoButton type="submit" onClick={handleSubmit}>
        Subir Resultado
      </SubirResultadoButton>
    </FormContainer>
  );
};

export default FormSubir;
