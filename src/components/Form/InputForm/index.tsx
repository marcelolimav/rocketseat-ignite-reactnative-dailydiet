import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { Input } from "@components/Form/Input";

import * as S from "./styles";

interface Props extends TextInputProps {
  label: string;
  control: Control;
  name: string;
  multiline?: boolean;
  error?: string | undefined;
}

export function InputForm({ label, control, name, multiline=false, error, ...rest }: Props) {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onChangeText={onChange} value={value} multiline={multiline} {...rest} />
        )}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
}
