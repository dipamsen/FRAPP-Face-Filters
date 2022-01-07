import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as FaceDetector from "expo-face-detector";
import * as StatusBar from "expo-status-bar";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Filter from "./Filter";

const data = {
  regular: [{ id: 1, image: require("../assets/Frapp-00.png") }],
  wayfarer: [
    { id: 4, image: require("../assets/Frapp-03.png") },
    { id: 5, image: require("../assets/Frapp-04.png") },
  ],
  rimless: [{ id: 10, image: require("../assets/Frapp-09.png") }],
  round: [
    { id: 2, image: require("../assets/Frapp-01.png") },
    { id: 3, image: require("../assets/Frapp-02.png") },
  ],
  aviator: [
    { id: 6, image: require("../assets/Frapp-05.png") },
    { id: 7, image: require("../assets/Frapp-06.png") },
    { id: 8, image: require("../assets/Frapp-07.png") },
    { id: 9, image: require("../assets/Frapp-08.png") },
  ],
};
const categories = ["regular", "wayfarer", "rimless", "round", "aviator"];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCamPerms: null,
      faces: [],
      currentFilter: "Filter1",
      selectedCategory: "aviator",
    };
  }
  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCamPerms);
  }
  onCamPerms = (status) => {
    this.setState({ hasCamPerms: status.status === "granted" });
  };
  onFacesDetected = (faces) => {
    this.setState({
      faces: faces.faces,
    });
  };
  onFaceDetectionError = (err) => {
    console.log(err);
  };
  render() {
    const { hasCamPerms } = this.state;
    if (hasCamPerms === null) {
      return <View />;
    }
    if (hasCamPerms === false) {
      return (
        <View style={styles.container}>
          <Text>No access to Camera.</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.droidSafeArea} /> */}
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text style={styles.titleText1}>FR</Text>
            <Text style={styles.titleText2}>APP</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>
              <Text style={styles.subheading1}>Try our </Text>
              <Text style={styles.subheading2}>cool Filters</Text>
            </Text>
          </View>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{
              flex: 1,
            }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: 1,
              detectLandmarks: 2,
              runClassifications: 2,
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFaceDetectionError}
          />
        </View>
        <View style={styles.framesContainer}>
          {this.state.faces.map((face) => {
            if (this.state.currentFilter === "Filter1") {
              return <Filter image={data[0]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter2") {
              return <Filter image={data[1]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter3") {
              return <Filter image={data[2]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter4") {
              return <Filter image={data[3]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter5") {
              return <Filter image={data[4]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter6") {
              return <Filter image={data[5]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter7") {
              return <Filter image={data[6]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter8") {
              return <Filter image={data[7]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter9") {
              return <Filter image={data[8]} key={face.faceId} face={face} />;
            } else if (this.state.currentFilter === "Filter10") {
              return <Filter image={data[9]} key={face.faceId} face={face} />;
            }
          })}
        </View>
        <View style={styles.categoryContainer}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              key={i}
              style={
                this.state.selectedCategory === cat
                  ? styles.categoryBoxSelected
                  : styles.categoryBox
              }
              onPress={() => this.setState({ selectedCategory: cat })}
            >
              <Text>{cat.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.framesContainer}>
          <ScrollView
            style={{
              flexDirection: "row",
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {data[this.state.selectedCategory].map((filterData) => {
              return (
                <TouchableOpacity
                  key={filterData.id}
                  style={styles.filterImageContainer}
                  onPress={() => {
                    this.setState({ currentFilter: `Filter${filterData.id}` });
                  }}
                >
                  <Image
                    source={filterData.image}
                    style={{ height: 30, width: 80 }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.filterContainer}></View>
        <View style={styles.actionContainer}></View>
      </View>
    );
  }
}

export default Main;
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   droidSafeArea: {
//     marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   headingContainer: {
//     flex: 0.15,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#6278e4",
//   },
//   titleText1: {
//     fontSize: RFValue(30),
//     fontWeight: "bold",
//     color: "#efb141",
//     fontStyle: "italic",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: -3, height: 3 },
//     textShadowRadius: 1,
//   },
//   titleText2: {
//     fontSize: RFValue(30),
//     fontWeight: "bold",
//     color: "white",
//     fontStyle: "italic",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: -3, height: 3 },
//     textShadowRadius: 1,
//   },
//   subheading1: {
//     fontSize: RFValue(20),
//     color: "#efb141",
//     fontStyle: "italic",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: -3, height: 3 },
//     textShadowRadius: 1,
//   },
//   subheading2: {
//     fontSize: RFValue(20),
//     color: "white",
//     fontStyle: "italic",
//     textShadowColor: "rgba(0, 0, 0, 0.75)",
//     textShadowOffset: { width: -3, height: 3 },
//     textShadowRadius: 1,
//   },
//   cameraStyle: { flex: 0.65 },
//   framesContainer: {
//     flex: 0.2,
//     paddingLeft: RFValue(20),
//     paddingRight: RFValue(20),
//     paddingTop: RFValue(30),
//     backgroundColor: "#6278e4",
//   },
//   filterImageContainer: {
//     height: RFPercentage(8),
//     width: RFPercentage(15),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#e4e7f8",
//     borderRadius: 30,
//     marginRight: 20,
//   },
//   categoryContainer: {
//     flex: 0.4,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     marginBottom: RFValue(10),
//   },
//   categoryBox: {
//     flex: 0.2,
//     borderRadius: 30,
//     borderWidth: 1,
//     backgroundColor: "white",
//     width: "100%",
//     padding: RFValue(3),
//     margin: 1,
//     alignItems: "center",
//   },
//   categoryBoxSelected: {
//     flex: 0.2,
//     borderRadius: 30,
//     borderWidth: 1,
//     backgroundColor: "#efb141",
//     width: "100%",
//     padding: RFValue(3),
//     margin: 1,
//     alignItems: "center",
//   },
// });
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6278e4",
  },
  titleText1: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  titleText2: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading1: {
    fontSize: RFValue(20),
    color: "#efb141",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  subheading2: {
    fontSize: RFValue(20),
    color: "white",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 1,
  },
  cameraStyle: { flex: 0.65 },
  framesContainer: {
    flex: 0.2,
    paddingLeft: RFValue(20),
    paddingRight: RFValue(20),
    paddingTop: RFValue(10),
    backgroundColor: "#6278e4",
  },
  filterImageContainer: {
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e7f8",
    borderRadius: 30,
    marginRight: 20,
  },
  categoryContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: RFValue(10),
  },
});
