import React from "react";
import { ForkKnife } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

export function EmptyMealList() {
  const { COLORS } = useTheme();
  return (
    <S.Container>
      <ForkKnife size={50} color={COLORS.GRAY_300} />
      <S.Title>Você não incluiu nenhuma refeição! Inclua uma nova.</S.Title>
    </S.Container>
  );
}
