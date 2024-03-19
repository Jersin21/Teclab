import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginVertical: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "contain", // Show complete image without cropping
    marginBottom: 10,
    textAlign: "center",
  },
  labName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  patientInfo: {
    fontSize: 15,
    marginBottom: 10,
  },
  date: {
    fontSize: 15,
    marginBottom: 10,
  },
  responsible: {
    fontSize: 15,
    marginBottom: 10,
  },
  imageName: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
});

const PDF = ({ data }) => {
  const currentDate = new Date().toLocaleDateString();

  Font.register({
    family: "Open Sans",
    fonts: [
      { src: "/path/to/OpenSans-Regular.ttf" },
      { src: "/path/to/OpenSans-Bold.ttf", fontWeight: "bold" },
    ],
  });

  return (
    <Document>
      {data.solicitud?.solicituddetalles?.map((detalle, index) => (
        <Page key={index} style={styles.page}>
          {index === 0 && (
            <View style={styles.section}>
              <Text style={styles.labName}>LABORATORIO CLINICO "TECLAB"</Text>
              <br />
              <br />
              {""}
              <Text style={styles.date}>Fecha: {currentDate}</Text>
              <Text style={styles.patientInfo}>
                Paciente: {data.solicitud.paciente}
              </Text>
              <Text style={styles.patientInfo}>
                Medico: {data.solicitud.medico.User.persona.nombre}
              </Text>
              <Text style={styles.patientInfo}>
                Clínica: {data.solicitud.medico.clinica.name}
              </Text>
              <Text style={styles.patientInfo}>
                Tipo de muestra: {data.solicitud.muestra}
              </Text>
              <Text style={styles.patientInfo}>
                Observaciones: {data.solicitud.observaciones}
              </Text>
            </View>
          )}
          <View style={styles.section}>
            <Text style={styles.heading}>
              {detalle.analisis.categorium.name}
            </Text>
            <Text style={styles.subheading}>{detalle.analisis.name}</Text>
            <Text style={styles.text}>
              Detalles: {detalle.resultado.detalle}
            </Text>
          </View>
          <View style={styles.section}>
            {detalle.images.map((image, imageIndex) => (
              <View key={imageIndex}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    src={`http://localhost:3030/${image.image_path}`}
                  />
                </View>
                <Text style={styles.imageName}>
                  {image.image_path.split("/").pop()}
                </Text>
              </View>
            ))}
          </View>
         
        </Page>
      ))}
    </Document>
  );
};

export default PDF;
