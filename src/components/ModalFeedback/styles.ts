import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IInside } from "@schemas/meal";

type PropsInsideType = {
  insideType: IInside;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

export const FeedbackTitle = styled.Text<PropsInsideType>`
  ${({ theme, insideType }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_M}px;
    color: ${insideType === "in"
      ? theme.COLORS.GREEN_DARK
      : theme.COLORS.RED_DARK};
  `}
`;

export const FeedbackText = styled.Text<PropsInsideType>`
  ${({ theme, insideType }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_M}px;
    color: ${theme.COLORS.GRAY_100};
    text-align: center;
  `}
`;

export const ImageContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 32px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  justify-content: space-between;
`;
