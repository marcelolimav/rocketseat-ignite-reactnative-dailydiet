import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type Props = TouchableOpacityProps & {
  label: string;
  type?: S.ButtonTypeStyleProps;
  icon?:  "+" | "e" | "x" ;
};

export function Button({ label, icon=undefined, type = "PRIMARY", ...rest }: Props) {
  return (
    <S.Container type={type} {...rest}>
      {icon && icon === "+" ? (
        <S.IconPlus type={type}/>
        ) : icon === "e" ? (
          <S.IconEdit type={type}/>
        ) : icon === "x" ? (
          <S.IconTrash type={type}/>
       ) : <></>}
       
       <S.Label type={type}>{label}</S.Label>
    </S.Container>
  );
}
