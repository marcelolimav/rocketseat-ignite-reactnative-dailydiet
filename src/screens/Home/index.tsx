import React, { useCallback, useState } from "react";
import { Image, SectionList, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { User } from "phosphor-react-native";

import { Button } from "@components/Form/Button";
import { MealCard } from "@components/MealCard";
import { ModalLoading } from "@components/ModalLoading";
import { EmptyMealList } from "@components/EmptyMealList";

import { useDiet } from "@hooks/useDiet";
import * as tools from "@utils/tools";
import { IMAGE_USER_COLLECTION } from "@utils/storageConfig";

import imgLogo from "../../assets/logo.png";

import * as S from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const { imageUser, mealList, result, isLoading, loadMealList, setImageUser } =
    useDiet();

  const { COLORS } = useTheme();
  const navigation = useNavigation();

  function handleStatistics() {
    navigation.navigate("statistics");
  }

  function handleNewMeal() {
    navigation.navigate("meal", {});
  }

  function handleMealDetails(id: string) {
    navigation.navigate("detail", { id });
  }

  function handlePhoto() {
    Alert.alert(
      "Selecione",
      "Informe de onde você quer pegar a foto",
      [
        {
          text: "Galeria",
          onPress: () => pickerImageFromGallery(),
        },
        {
          text: "Câmera",
          onPress: () => pickerImageFromCamera(),
        },
        {
          text: "Remover imagem",
          onPress: () => handleRemoveImage(),
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  }

  async function handleRemoveImage() {
    await AsyncStorage.setItem(IMAGE_USER_COLLECTION, "");
    setImageUser("");
  }

  async function pickerImageFromGallery() {
    if (!hasGalleryPermission) {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    }

    if (hasGalleryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result?.canceled) {
        await AsyncStorage.setItem(IMAGE_USER_COLLECTION, result.assets[0].uri);
        setImageUser(result.assets[0].uri);
      }
    }
  }

  async function pickerImageFromCamera() {
    if (!hasCameraPermission) {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      await AsyncStorage.setItem(IMAGE_USER_COLLECTION, result.assets[0].uri);
      setImageUser(result.assets[0].uri);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadMealList();
    }, [])
  );

  return (
    <S.Container>
      <S.HeaderContainer>
        <Image source={imgLogo} />
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            borderColor: COLORS.GRAY_400,
            borderWidth: 2,
          }}
          onPress={() => handlePhoto()}
        >
          {!imageUser ? (
            <User size={32} />
          ) : (
            <Image
              source={{ uri: imageUser }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                flex: 1,
                resizeMode: "cover",
              }}
            />
          )}
        </TouchableOpacity>
      </S.HeaderContainer>

      <S.PercentageContainer inside={result.inside}>
        <S.PercentageDetail onPress={handleStatistics}>
          <S.IconArrow
            size={24}
            color={result.inside === "in" ? COLORS.GREEN_DARK : COLORS.RED_DARK}
          />
        </S.PercentageDetail>

        <S.PercentageContent>
          <S.PercentageValue>
            {tools.formatValue(result.percentageIn, "percent")}
          </S.PercentageValue>
          <S.PercentageText>das refeições dentro da dieta</S.PercentageText>
        </S.PercentageContent>
      </S.PercentageContainer>

      <S.Title>Refeições</S.Title>

      <Button label="Nova refeição" icon="+" onPress={handleNewMeal} />

      <SectionList
        sections={mealList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <MealCard data={item} onDetail={() => handleMealDetails(item.id)} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <S.ListTitle>{title}</S.ListTitle>
        )}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={300}
        ListEmptyComponent={EmptyMealList}
      />

      <ModalLoading visible={isLoading} />
    </S.Container>
  );
}
