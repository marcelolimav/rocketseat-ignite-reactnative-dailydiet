import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";

import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { DietContextProvider } from "./src/context/DietContext";
import { Routes } from "./src/routes";

import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";

import { Loading } from "@components/Loading";

import theme from "./src/theme";


export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <DietContextProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </DietContextProvider>
    </ThemeProvider>
  );
}
