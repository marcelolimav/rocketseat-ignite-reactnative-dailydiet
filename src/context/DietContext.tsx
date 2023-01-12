import { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEAL_COLLECTION, IMAGE_USER_COLLECTION } from "@utils/storageConfig";

import { IMeal, IMealList, IResult, IData, IInside } from "@schemas/meal";

export interface DietContextDataProps {
  isLoading: boolean;
  data: IData;
  result: IResult;
  mealList: IMealList[];
  imageUser: string;
  setImageUser: (uri: string) => void;
  loadMealList: () => Promise<void>;
  addMeal: (meal: IMeal) => Promise<void>;
  removeMeal: (meal: IMeal) => Promise<void>;
  editMeal: (meal: IMeal) => Promise<void>;
  getMeal: (id: string) => Promise<IMeal>;
}

interface DietProviderProps {
  children: ReactNode;
}

export const DietContext = createContext({} as DietContextDataProps);

const MIN_INSIDE = 50;

export function DietContextProvider({ children }: DietProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUser, setImageUser] = useState<string>("");
  const [data, setData] = useState<IData>({} as IData);
  const [result, setResult] = useState<IResult>({} as IResult);
  const [mealList, setMealList] = useState<IMealList[]>([] as IMealList[]);

  function calculateResultPercentage(total: number, nmInsideIn: number) {
    const percentageIn = Number(((nmInsideIn * 100) / total).toFixed(2));

    const inside: IInside = percentageIn >= MIN_INSIDE ? "in" : "out";

    return { percentageIn, inside };
  }

  async function getImageUser() {
    try {
      const response = await AsyncStorage.getItem(IMAGE_USER_COLLECTION);
      if (response) {
        setImageUser(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async function getStorage() {
    try {
      let currentData = {
        result: {
          total: 0,
          in: 0,
          out: 0,
          percentageIn: 0,
          inside: "in",
          sequenceInsideIn: 0,
        },
        mealList: [] as IMeal[],
      } as IData;

      const response = await AsyncStorage.getItem(MEAL_COLLECTION);

      if (response) {
        currentData = JSON.parse(response) as IData;
      }

      return currentData;
    } catch (error) {
      throw error;
    }
  }

  async function getMeal(id: string) {
    setIsLoading(true);
    try {
      let data = await getStorage();
      const meal = data.mealList.find((item: IMeal) => item.id === id) as IMeal;

      return meal;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMealList() {
    setIsLoading(true);
    try {
      let currentData = await getStorage();
      let da: Date, db: Date;
      let mealListByDate: IMealList[] = [] as IMealList[];

      currentData.mealList.sort((a, b) => {
        (da = new Date(`${a.date} ${a.hour}`)),
          (db = new Date(`${b.date} ${b.hour}`));
        return db.valueOf() - da.valueOf();
      });

      let dataSequence = currentData.mealList.flat().map((i) => i.inside);

      currentData.result.sequenceInsideIn =
        Math.max.apply(
          null,
          dataSequence
            .join("")
            .split("out")
            .filter((i) => !!i)
            .map((i) => i.length)
        ) / 2;
      currentData.result.sequenceInsideIn =
        currentData.result.sequenceInsideIn >= 0
          ? currentData.result.sequenceInsideIn
          : 0;

      let idxDate: number = 0;
      currentData.mealList.forEach((i) => {
        if (
          mealListByDate.length == 0 ||
          mealListByDate[idxDate].title !== i.date
        ) {
          if (mealListByDate.length > 0) {
            idxDate++;
          }
          mealListByDate.push({ title: i.date, data: [] });
        }

        mealListByDate[idxDate].data.push(i);
      });

      setData(currentData);
      setResult(currentData.result);
      setMealList(mealListByDate);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function addMeal(meal: IMeal) {
    setIsLoading(true);

    try {
      let dataAlt = await getStorage();

      dataAlt.mealList.unshift(meal);
      dataAlt.result.total++;
      if (meal.inside === "in") {
        dataAlt.result.in++;
      } else {
        dataAlt.result.out++;
      }

      const resultPercentage = calculateResultPercentage(
        dataAlt.result.total,
        dataAlt.result.in
      );

      dataAlt.result.percentageIn = resultPercentage.percentageIn;
      dataAlt.result.inside = resultPercentage.inside;

      await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(dataAlt));
    } catch (error) {
      throw error;
    } finally {
      await loadMealList();
    }
  }

  async function removeMeal(meal: IMeal) {
    setIsLoading(true);

    try {
      let dataAlt = await getStorage();

      const idxMeal = dataAlt.mealList.findIndex(
        (item: IMeal) => item.id === meal.id
      );

      if (idxMeal > -1) {
        dataAlt.mealList.splice(idxMeal, 1);
      }

      dataAlt.result.total--;
      dataAlt.result[meal.inside]--;

      const resultPercentage = calculateResultPercentage(
        dataAlt.result.total,
        dataAlt.result.in
      );

      dataAlt.result.percentageIn = resultPercentage.percentageIn;
      dataAlt.result.inside = resultPercentage.inside;

      await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(dataAlt));
    } catch (error) {
      throw error;
    } finally {
      await loadMealList();
    }
  }

  async function editMeal(meal: IMeal) {
    setIsLoading(true);
    try {
      let dataAlt = await getStorage();

      const idxMeal = dataAlt.mealList.findIndex(
        (item: IMeal) => item.id === meal.id
      );

      if (idxMeal > -1) {
        const oldMeal = dataAlt.mealList[idxMeal];
        dataAlt.result[oldMeal.inside]--;
        dataAlt.result[meal.inside]++;
        dataAlt.mealList[idxMeal] = meal;

        const resultPercentage = calculateResultPercentage(
          dataAlt.result.total,
          dataAlt.result.in
        );

        dataAlt.result.percentageIn = resultPercentage.percentageIn;
        dataAlt.result.inside = resultPercentage.inside;

        await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(dataAlt));
      }
    } catch (error) {
      throw error;
    } finally {
      await loadMealList();
    }
  }

  useEffect(() => {
    getImageUser();
    loadMealList();
  }, []);

  return (
    <DietContext.Provider
      value={{
        isLoading,
        data,
        result,
        mealList,
        imageUser,
        setImageUser,
        loadMealList,
        addMeal,
        removeMeal,
        editMeal,
        getMeal,
      }}
    >
      {children}
    </DietContext.Provider>
  );
}
