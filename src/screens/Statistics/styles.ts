import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "phosphor-react-native";
import { IInside } from "@schemas/meal";

type Props = {
  inside: IInside;
};

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View<Props>`
  width: 100%;
  height: 200px;
  background-color: ${({ theme, inside }) =>
    inside === "in" ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};

  padding-top: 60px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const GoBack = styled.TouchableOpacity`
  align-items: flex-start;
`;

export const IconGoBack = styled(ArrowLeft)`
  margin-right: -5px;
  margin-top: -10px;
`;

export const PercentContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const PercentValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_G}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const PercentText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.BODY_S}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const Content = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: -32px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};

  padding-top: 23px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_XS}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const Sequence = styled.View`
  margin-top: 23px;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`;

export const ValueStatistic = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_M}px;
    color: ${theme.COLORS.GRAY_100};
    text-align: center;
  `}
`;

export const TextStatistic = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.BODY_S}px;
    color: ${theme.COLORS.GRAY_200};
    text-align: center;
  `}
`;

export const InfoContainer = styled.View`
  width: 100%;
  margin-top: 23px;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

export const InfoSuccess = styled.View`
  width: 48%;
  background-color: ${({ theme }) => theme.COLORS.GREEN_LIGHT};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export const InfoFail = styled.View`
  width: 48%;
  background-color: ${({ theme }) => theme.COLORS.RED_LIGHT};
  border-radius: 8px;
  padding: 16px;
  align-items: center;
`;
