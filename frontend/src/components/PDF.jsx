import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
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
    fontSize: 14,
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
    objectFit: "cover",
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
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  responsible: {
    fontSize: 16,
    marginBottom: 10,
  },
});

const PDF = ({ data }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      {data.solicitud?.solicituddetalles?.map((detalle, index) => (
        <Page key={index} style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.labName}>LABORATORIO CLINICO "TECLAB"</Text>
            <br />
            <br />
            <Text style={styles.date}>Fecha: {currentDate}</Text>
            <Text style={styles.patientInfo}>
              Paciente: {data.solicitud.paciente}
            </Text>
            <Text style={styles.patientInfo}>
              Observaciones: {data.solicitud.observaciones}
            </Text>
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
              <View key={imageIndex} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  src={`http://localhost:3030/${image.image_path}`}
                />
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PDF;
