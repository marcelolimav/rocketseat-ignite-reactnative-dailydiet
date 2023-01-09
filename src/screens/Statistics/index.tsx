import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { useDiet } from "@hooks/useDiet";
import * as tools from "@utils/tools";

import * as S from "./styles";

export function Statistics() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();

  const { result } = useDiet();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <S.Container>
      <S.Header inside={result.inside}>
        <S.GoBack onPress={handleGoBack}>
          <S.IconGoBack
            size={24}
            color={result.inside === "in" ? COLORS.GREEN_DARK : COLORS.RED_DARK}
          />
        </S.GoBack>

        <S.PercentContent>
          <S.PercentValue>
            {tools.formatValue(result.percentageIn, "percent")}
          </S.PercentValue>
          <S.PercentText>das refeições dentro da dieta</S.PercentText>
        </S.PercentContent>
      </S.Header>

      <S.Content>
        <S.Title>Estatísticas gerais</S.Title>

        <S.Sequence>
          <S.ValueStatistic>{result.sequenceInsideIn}</S.ValueStatistic>
          <S.TextStatistic>
            melhor sequência de pratos dentro da dieta
          </S.TextStatistic>
        </S.Sequence>

        <S.Sequence>
          <S.ValueStatistic>{result.total}</S.ValueStatistic>
          <S.TextStatistic>refeições registradas</S.TextStatistic>
        </S.Sequence>

        <S.InfoContainer>
          <S.InfoSuccess>
            <S.ValueStatistic>{result.in}</S.ValueStatistic>
            <S.TextStatistic>refeições dentro da dieta</S.TextStatistic>
          </S.InfoSuccess>

          <S.InfoFail>
            <S.ValueStatistic>{result.out}</S.ValueStatistic>
            <S.TextStatistic>refeições fora da dieta</S.TextStatistic>
          </S.InfoFail>
        </S.InfoContainer>
      </S.Content>
    </S.Container>
  );
}
