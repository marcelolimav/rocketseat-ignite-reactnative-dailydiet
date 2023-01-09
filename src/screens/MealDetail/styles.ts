import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";
import { IInside } from "@schemas/meal";

type Props = {
  inside: IInside;
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
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  padding-top: 23px;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 20px;
`;

export const Fields = styled.View`
  flex: 1;
`;

export const DataContainer = styled.View`
  margin-bottom: 23px;
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TEXT}px;
    color: ${theme.COLORS.GRAY_100};
    margin-bottom: 10px;
  `}
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_M}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const DateText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_XS}px;
    color: ${theme.COLORS.GRAY_100};
    margin-bottom: 10px;
  `}
`;

export const InsideContainer = styled.View`
  width: 50%;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 20px;
  margin-top: 10px;
`;

export const InsideBall = styled.View<Props>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 8px;
  background-color: ${({ theme, inside }) =>
    inside === "in" ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
`;

export const Overlay = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.OVERLAY};
  align-items: center;
  justify-content: center;
`;

export const AlertContainer = styled.View`
  width: 100%;
  padding: 24px;
  padding-top: 40px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 8px;
`;

export const AlertText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_S}px;
    color: ${theme.COLORS.GRAY_200};
    text-align: center;
  `}
`;

export const AlertButtonContainer = styled.View`
  width: 50%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
`;

export const Footer = styled.View`
  height: 110px;
  justify-content: space-between;
`;
