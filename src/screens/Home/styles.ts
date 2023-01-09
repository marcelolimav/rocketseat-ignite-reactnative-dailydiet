import styled, { css } from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowUpRight } from "phosphor-react-native";
import { IInside } from "@schemas/meal";

type Props = {
  inside: IInside;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const PercentageContainer = styled.View<Props>`
  margin-top: 32px;
  margin-bottom: 40px;
  width: 100%;
  background-color: ${({ theme, inside }) =>
    inside === "in" ? theme.COLORS.GREEN_LIGHT : theme.COLORS.RED_LIGHT};

  border-radius: 8px;

  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const PercentageContent = styled.View`
  width: 100%;
  align-items: center;
`;

export const PercentageValue = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_G}px;
    color: ${theme.COLORS.GRAY_100};
  `}
`;

export const PercentageText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.BODY_S}px;
    color: ${theme.COLORS.GRAY_200};
  `}
`;

export const PercentageDetail = styled.TouchableOpacity`
  align-items: flex-end;
`;

export const IconArrow = styled(ArrowUpRight)`
  margin-right: -5px;
  margin-top: -10px;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
`;

export const ListTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.TITLE_S}px;
    color: ${theme.COLORS.GRAY_100};
    margin-top: 20px;
  `}
`;
