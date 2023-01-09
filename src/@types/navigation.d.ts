import { RouteParamsMeal } from "@screens/Meal";
import { RouteParamsFeedback } from "@components/ModalFeedback";
import { RouteParamsMealDetail } from "@screens/MealDetail";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: undefined;
      detail: RouteParamsMealDetail;
      meal: RouteParamsMeal;
    }
  }
}
