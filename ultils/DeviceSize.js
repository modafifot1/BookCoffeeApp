import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const vh = (percent) => {
  return (windowHeight * percent) / 100;
};
const vw = (percent) => {
  return (windowWidth * percent) / 100;
};
export { vh, vw };
