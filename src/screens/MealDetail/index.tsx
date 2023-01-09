import React, { useState, useCallback } from "react";
import { Alert, Modal } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { Button } from "@components/Form/Button";

import { IMeal } from "@schemas/meal";
import { useDiet } from "@hooks/useDiet";
import { AppError } from "@utils/AppError";

import * as S from "./styles";

export type RouteParamsMealDetail = {
  id: string;
};

export function MealDetail() {
  const [showModal, setShowModal] = useState(false);
  const [meal, setMeal] = useState({} as IMeal);

  const { removeMeal, getMeal } = useDiet();

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParamsMealDetail;

  function handleGoBack() {
    navigation.navigate("home");
  }

  function handleEditMeal() {
    navigation.navigate("meal", { id: meal.id });
  }

  async function handleDeleteMeal() {
    try {
      await removeMeal(meal);
      handleGoBack();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Excluir refeição", error.message);
      } else {
        console.log(error);
        Alert.alert("Excluir refeição", "Não foi possível excluir.");
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function get() {
        const mealItem = await getMeal(id);
        setMeal(mealItem);
      }
      get();
    }, [id])
  );

  return (
    <S.Container>
      <S.Header>
        <S.GoBack onPress={handleGoBack}>
          <S.IconGoBack />
        </S.GoBack>

        <S.Title>Refeição</S.Title>
      </S.Header>

      <S.Content>
        <S.Fields>
          <S.DataContainer>
            <S.Name>{meal.name}</S.Name>
            <S.Text>{meal.description}</S.Text>
          </S.DataContainer>

          <S.DataContainer>
            <S.DateText>Data e hora</S.DateText>
            <S.Text>{`${meal.date} ás ${meal.hour}`}</S.Text>
          </S.DataContainer>

          <S.InsideContainer>
            <S.InsideBall inside={meal.inside} />
            <S.Text>{`${
              meal.inside === "in" ? "dentro da dieta" : "fora da dieta"
            }`}</S.Text>
          </S.InsideContainer>
        </S.Fields>

        <S.Footer>
          <Button label="Editar refeição" icon="e" onPress={handleEditMeal} />
          <Button
            label="Excluir refeição"
            type="SECONDARY"
            icon="x"
            onPress={() => setShowModal(true)}
          />
        </S.Footer>
      </S.Content>

      <Modal visible={showModal} transparent>
        <S.Overlay>
          <S.AlertContainer>
            <S.AlertText>
              Deseja realmente excluir o registro da refeição?
            </S.AlertText>
            <S.AlertButtonContainer>
              <Button
                label="Cancelar"
                type="SECONDARY"
                style={{ marginRight: 5 }}
                onPress={() => setShowModal(false)}
              />
              <Button label="Sim, excluir" onPress={handleDeleteMeal} />
            </S.AlertButtonContainer>
          </S.AlertContainer>
        </S.Overlay>
      </Modal>
    </S.Container>
  );
}
