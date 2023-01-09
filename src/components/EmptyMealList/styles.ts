import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.TITLE_S}px;
    color: ${theme.COLORS.GRAY_300};
  `}
  text-align: center;
  margin-top: 16px;
`;
