import React from "react";
import { Image, Modal } from "react-native";

import { Button } from "@components/Form/Button";

import { IInside } from "@schemas/meal";

import * as S from "./styles";

import imgDietIn from "../../assets/dietin.png";
import imgDietOut from "../../assets/dietout.png";

export type Props = {
  inside: IInside;
  showModal: boolean;
  onGoBack: () => void;
  onGoHome: () => void;
};

export function ModalFeedback({
  inside,
  showModal,
  onGoBack,
  onGoHome,
}: Props) {
  return (
    <Modal visible={showModal} transparent style={{ flex: 1 }}>
      <S.Container>
        <S.FeedbackTitle insideType={inside || "in"}>
          {inside === "in" ? "Continue assim!" : "Que pena!"}
        </S.FeedbackTitle>
        <S.FeedbackText insideType={inside || "in"}>
          {inside === "in"
            ? `Você continua dentro da dieta. Muito bem!`
            : "Você saiu da dieta dessa vez, mas continue se esforçando e não desista!"}
        </S.FeedbackText>
        <S.ImageContainer>
          <Image source={inside === "in" ? imgDietIn : imgDietOut} />
        </S.ImageContainer>

        <S.ButtonContainer>
          <Button
            label="Incluir nova refeição"
            onPress={onGoBack}
            style={{ marginBottom: 10 }}
          />
          <Button
            label="Voltar para página inicial"
            type="SECONDARY"
            onPress={onGoHome}
          />
        </S.ButtonContainer>
      </S.Container>
    </Modal>
  );
}
