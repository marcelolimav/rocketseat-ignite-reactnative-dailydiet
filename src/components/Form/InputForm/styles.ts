import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size:  ${({ theme }) => theme.FONT_SIZE.TITLE_XS}px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  margin-bottom: 3px;
`;

export const Error = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size:  ${({ theme }) => theme.FONT_SIZE.BODY_XS}px;
  color: ${({ theme }) => theme.COLORS.RED_DARK};
  margin: 3px;
`;
