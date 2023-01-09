import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type Props = TextInputProps & {
  multiline: boolean;
};

export function Input({ multiline=false, ...rest }: Props) {
  return <S.Container multiline={multiline} numberOfLines={multiline? 6 : 1} textAlignVertical={multiline? "top" : "center"} {...rest} />;
}
