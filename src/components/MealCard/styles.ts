import styled, { css } from "styled-components/native";

import { IInside } from "@schemas/meal";
type Props = {
  inside: IInside;
};

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 49px;

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_400};

  border-radius: 6px;
  padding: 12px 16px 12px 12px;
  margin-top: 6px;
`;

export const hourContainer = styled.View`
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.COLORS.GRAY_400};
  padding-right: 8px;
`;

export const hourText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_S}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const mealContainer = styled.View`
  flex: 1;
  padding-left: 6px;
`;

export const mealText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_S}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const mealInside = styled.View<Props>`
  ${({ theme, inside }) => css`
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: ${inside === "in"
      ? theme.COLORS.GREEN_MID
      : theme.COLORS.RED_MID};
  `}
`;
