import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Button } from "@components/Form/Button";
import { InputForm } from "@components/Form/InputForm";
import { ModalLoading } from "@components/ModalLoading";
import { ModalFeedback } from "@components/ModalFeedback";

import { useDiet } from "@hooks/useDiet";
import { AppError } from "@utils/AppError";
import { formatDateTime } from "@utils/tools";
import { IInside, IMeal } from "@schemas/meal";

import * as S from "./styles";

type DataPickerModeProps = "date" | "time";

export type RouteParamsMeal = {
  id?: string;
};

type FeedbackProps = {
  inside: IInside;
  show: boolean;
};

interface FormData {
  name: string;
  description: string;
}

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Nome é obrigatório")
    .max(60, "O nome pode ter no máximo 60 dígitos."),
  description: Yup.string()
    .required("Descrição é obrigatória")
    .max(200, "A descrição pode ter no máximo 200 dígitos."),
});

const newData: IMeal = {
  id: "",
  name: "",
  description: "",
  date: "",
  hour: "",
  inside: "off",
};

export function Meal() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<DataPickerModeProps>("date");
  const [show, setShow] = useState(false);
  const [showModalFeedback, setShowModalFeedback] = useState<FeedbackProps>({
    inside: "off",
    show: false,
  } as FeedbackProps);
  const [meal, setMeal] = useState<IMeal>(newData);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as RouteParamsMeal;

  const { addMeal, editMeal, isLoading, data } = useDiet();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSelectInside(inside: IInside) {
    setMeal({ ...meal, inside });
  }

  function onChangeDate(selectedDate: Date | undefined) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (mode === "date") {
      setMeal({
        ...meal,
        date: formatDateTime(currentDate, "date"),
        hour: meal.hour ? meal.hour : formatDateTime(currentDate, "hour"),
      });
    } else {
      setMeal({ ...meal, hour: formatDateTime(currentDate, "hour") });
    }
  }

  function showMode(currentMode: DataPickerModeProps) {
    setShow(true);
    setMode(currentMode);
  }

  function handleGoBack() {
    setShowModalFeedback({ ...showModalFeedback, show: false });
    navigation.goBack();
  }

  async function handleAddEditMeal(form: FormData) {
    setMeal({ ...meal, name: form.name, description: form.description });

    if (!meal.date) {
      return Alert.alert("Atenção!", "Informe a data da refeição.");
    }

    if (!meal.hour) {
      return Alert.alert("Atenção!", "Informe o horário da refeição.");
    }

    if (meal.inside === "off") {
      return Alert.alert(
        "Atenção!",
        "Informe se a refeição está dentro da dieta ou não."
      );
    }

    try {
      if (id) {
        await editMeal({
          ...meal,
          name: form.name,
          description: form.description,
        });
      } else {
        await addMeal({
          ...meal,
          id: String(uuid.v4()),
          name: form.name,
          description: form.description,
        });
      }

      if (!id) {
        setShowModalFeedback({ inside: meal.inside, show: true });
      } else {
        navigation.navigate("detail", { id });
      }

      reset();
      onChangeDate(new Date());
      setMeal(newData);
    } catch (error) {
      const titleMsg = `${!id ? "Nova" : "Editar"} refeição`;

      if (error instanceof AppError) {
        Alert.alert(titleMsg, error.message);
      } else {
        console.log(error);
        Alert.alert(
          titleMsg,
          `Não foi possível ${!id ? "adicionar" : "editar"}.`
        );
      }
    }
  }

  useEffect(() => {
    if (id) {
      const dataMeal = data.mealList.find((item) => item.id === id) as IMeal;
      setMeal(dataMeal);
      setValue("name", dataMeal.name);
      setValue("description", dataMeal.description);
    } else {
      //onChangeDate(new Date());
    }
  }, [id]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.GoBack onPress={handleGoBack}>
            <S.IconGoBack />
          </S.GoBack>

          <S.Title>{`${id ? "Editar" : "Nova"} Refeição`}</S.Title>
        </S.Header>

        <S.Content>
          <S.Form>
            <S.Fields>
              <InputForm
                name="name"
                label="Nome"
                control={control}
                autoCapitalize="sentences"
                autoCorrect={false}
                returnKeyType="next"
                error={errors.name && String(errors.name.message)}
              />
              <InputForm
                name="description"
                label="Descrição"
                control={control}
                autoCapitalize="sentences"
                autoCorrect={false}
                multiline={true}
                returnKeyType="next"
                error={errors.description && String(errors.description.message)}
              />

              <S.FieldsRow>
                <S.InfoContainer>
                  <S.Label>Data</S.Label>
                  <S.DateContent onPress={() => showMode("date")}>
                    <S.DateText>{meal.date}</S.DateText>
                  </S.DateContent>
                </S.InfoContainer>

                <S.InfoContainer>
                  <S.Label>Hora</S.Label>
                  <S.DateContent onPress={() => showMode("time")}>
                    <S.DateText>{meal.hour}</S.DateText>
                  </S.DateContent>
                </S.InfoContainer>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onTouchStart={() => Keyboard.dismiss}
                    onChange={(event, date) =>
                      event.type === "set" ? onChangeDate(date) : undefined
                    }
                  />
                )}
              </S.FieldsRow>

              <S.Label>Está dentro da dieta?</S.Label>
              <S.FieldsRow>
                <S.InfoContainer>
                  <S.Inside
                    insideType="in"
                    insideSelected={meal.inside === "in"}
                    onPress={() => handleSelectInside("in")}
                  >
                    <S.InsideBall insideType="in" />
                    <S.Label>Sim</S.Label>
                  </S.Inside>
                </S.InfoContainer>

                <S.InfoContainer>
                  <S.Inside
                    insideType="out"
                    insideSelected={meal.inside === "out"}
                    onPress={() => handleSelectInside("out")}
                  >
                    <S.InsideBall insideType="out" />
                    <S.Label>Não</S.Label>
                  </S.Inside>
                </S.InfoContainer>
              </S.FieldsRow>
            </S.Fields>
          </S.Form>
          <Button
            label={`${
              id ? "Salvar alterações" : "Cadastrar refeição"
            } Refeição`}
            onPress={handleSubmit((data) =>
              handleAddEditMeal(data as FormData)
            )}
          />
        </S.Content>

        <ModalLoading visible={isLoading} />
        <ModalFeedback
          showModal={showModalFeedback.show}
          inside={showModalFeedback.inside}
          onGoBack={() => setShowModalFeedback({ inside: "off", show: false })}
          onGoHome={() => handleGoBack()}
        />
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
