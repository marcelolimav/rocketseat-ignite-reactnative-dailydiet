import React, { useCallback, useState } from "react";
import { Image, SectionList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { Button } from "@components/Form/Button";
import { MealCard } from "@components/MealCard";
import { ModalLoading } from "@components/ModalLoading";

import { useDiet } from "@hooks/useDiet";
import { IMeal, IMealList } from "@schemas/meal";
import * as tools from "@utils/tools";

import imgLogo from "../../assets/logo.png";
import imgPerson from "../../assets/person.png";

import * as S from "./styles";
import { EmptyMealList } from "@components/EmptyMealList";

export function Home() {
  const { mealList, result, isLoading, loadMealList } = useDiet();

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

  useFocusEffect(
    useCallback(() => {
      loadMealList();
    }, [])
  );

  return (
    <S.Container>
      <S.HeaderContainer>
        <Image source={imgLogo} />
        <Image source={imgPerson} />
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
