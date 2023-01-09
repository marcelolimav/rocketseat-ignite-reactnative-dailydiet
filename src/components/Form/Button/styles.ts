import styled, { css } from "styled-components/native";
import { Plus, PencilSimpleLine, Trash } from "phosphor-react-native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonTypeStyleProps;
};

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  height: 50px;
  flex-direction: row;
  border-radius: 6px;

  ${({ theme, type }) =>
    type === "PRIMARY" &&
    css`
      background-color: ${({ theme }) => theme.COLORS.GRAY_200};
    `};
    
  ${({ theme, type }) =>
    type === "SECONDARY" &&
    css`
      border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
    `};

  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text<Props>`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.TITLE_XS}px;
  color: ${({ theme, type }) => type === "PRIMARY" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100};
`;

export const IconPlus = styled(Plus).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100,
}))`
  margin-right:10px;
`;

export const IconEdit = styled(PencilSimpleLine).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100,
}))`
  margin-right:10px;
`;

export const IconTrash = styled(Trash).attrs<Props>(({ theme, type }) => ({
  size: 24,
  color: type === "PRIMARY" ? theme.COLORS.WHITE : theme.COLORS.GRAY_100,
}))`
  margin-right:10px;
`;