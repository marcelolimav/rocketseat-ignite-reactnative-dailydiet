import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";

import { IInside } from "@schemas/meal";

type PropsInsideType = {
  insideType: IInside;
};

type PropsInsideSelected = PropsInsideType & {
  insideSelected: boolean;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const Header = styled.View`
  width: 100%;
  height: 132px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};

  padding-top: 32px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const GoBack = styled.TouchableOpacity`
  align-items: flex-start;
`;

export const IconGoBack = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.GRAY_100,
}))`
  margin-right: -5px;
  margin-top: -10px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_S}px;
    color: ${theme.COLORS.GRAY_100};
    margin-left: 82px;
  `}
`;

export const Content = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -18px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  padding-top: 23px;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 20px;
`;

export const Form = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;

  padding: 20px;
`;

export const Fields = styled.View``;

export const FieldsRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InfoContainer = styled.View`
  width: 45%;
  margin-bottom: 16px;
`;
export const Label = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_XS}px;
    color: ${theme.COLORS.GRAY_200};
    margin-bottom: 3px;
  `}
`;

export const DateContent = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
`;

export const DateText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_M}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Inside = styled.TouchableOpacity<PropsInsideSelected>`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, insideSelected, insideType }) =>
    !insideSelected
      ? theme.COLORS.GRAY_600
      : insideType === "in"
      ? theme.COLORS.GREEN_LIGHT
      : theme.COLORS.RED_LIGHT};
  border: 1px solid
    ${({ theme, insideSelected, insideType }) =>
      !insideSelected
        ? theme.COLORS.GRAY_600
        : insideType === "in"
        ? theme.COLORS.GREEN_DARK
        : theme.COLORS.RED_DARK};
  border-radius: 6px;
`;

export const InsideBall = styled.View<PropsInsideType>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${({ theme, insideType }) =>
    insideType === "in" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
`;
