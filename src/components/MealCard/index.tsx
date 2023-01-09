import React from "react";

import { IMeal } from "@schemas/meal";

import * as S from "./styles";

type Props = {
  data: IMeal;
  onDetail: () => void;
};

export function MealCard({ data, onDetail }: Props) {
  return (
    <S.Container onPress={onDetail}>
      <S.hourContainer>
        <S.hourText>{data.hour}</S.hourText>
      </S.hourContainer>

      <S.mealContainer>
        <S.mealText>{data.name}</S.mealText>
      </S.mealContainer>

      <S.mealInside inside={data.inside} />
    </S.Container>
  );
}
