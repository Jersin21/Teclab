import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoriasRoute } from "../utils/APIroute";
import Sidebar from "./Sidebar";
import AnalysisForm from "./FormAnalisysSubir";

const FormContainer = styled.div`
  margin-left: 250px;
  margin-top: 10px;
  padding: 20px;
  background-color: #1a1a2e;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
  margin: 0;
`;

const SubirResultadoButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const FormSubir = () => {
  const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
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
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchAnalisis() {
      const res = await axios.get(`${categoriasRoute}/${params.id}`, config);
      setData(res.data);
    }
    fetchAnalisis();
  }, []);

  const handleResultChange = (id, value) => {
    setResults((prevResults) => {
      const updatedResults = [...prevResults];
      const index = updatedResults.findIndex((result) => result.id === id);
      if (index !== -1) {
        updatedResults[index] = { id, value };
      } else {
        updatedResults.push({ id, value });
      }
      return updatedResults;
    });
  };

  const handleImageChange = (id, updatedImages) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const index = newImages.findIndex((image) => image.id === id);

      if (index !== -1) {
        newImages[index] = {
          id,
          images: updatedImages,
        };
      } else {
        newImages.push({
          id,
          images: updatedImages,
        });
      }

      return newImages;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("results", JSON.stringify(results));

      for (const analysis of images) {
        const { id, images: imageArray } = analysis;
      
        for (const image of imageArray) {
          if (image instanceof File) {
            const newImageName = `${id}-${image.name}`;
            formData.append("images", image, newImageName);
          }
        }
      }
      const response = await axios.put(
        `${categoriasRoute}/${params.id}`,
        formData,
        config
      );
      console.log(response);

      if (response.data.status === true) {
        toast.success("Resultado y archivo subidos con éxito", toastOptions);
        setTimeout(() => {
          window.location.href = "/responsable";
        }, 1000);
      } else {
        toast.error("Error al subir resultado y archivo", toastOptions);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al subir resultado y archivo", toastOptions);
    }
  };

  return (
    <FormContainer>
      <Sidebar />
      <h1>Subir Resultado de Análisis</h1>
      <form onSubmit={(e) => handleSubmit(e)} enctype="multipart/form-data">
        {data.solicitud?.solicituddetalles?.map((detalle, index) => (
          <AnalysisForm
            key={index}
            category={detalle.analisis.categorium.name}
            analysis={detalle}
            onResultChange={(id, value) => handleResultChange(id, value)}
            onImageChange={(id, updatedImages) =>
              handleImageChange(id, updatedImages)
            }
            onRemoveImage={(id) => handleRemoveFile(id)}
          />
        ))}
        <SubirResultadoButton type="submit">
          Subir Resultado
        </SubirResultadoButton>
      </form>
      <ToastContainer></ToastContainer>
    </FormContainer>
  );
};
export default FormSubir;
