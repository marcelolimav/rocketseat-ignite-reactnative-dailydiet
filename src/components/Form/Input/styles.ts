import styled from "styled-components/native";
import { TextInput } from "react-native";

type Props = {
  multiline: boolean;
}

export const Container = styled(TextInput)<Props>`
  width: 100%;
  height: ${({ multiline }) => multiline? 120 : 48}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.BODY_M}px;
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  padding: 8px;
`;
