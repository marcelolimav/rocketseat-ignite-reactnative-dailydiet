export type IInside = "in" | "out" | "off";

export interface IMeal {
  id: string;
  name: string;
  description: string;
  date: string;
  hour: string;
  inside: IInside;
  dateTime?: string;
}

export interface IMealList {
  title: string;
  data: IMeal[];
}

export interface IResult {
  total: number;
  in: number;
  out: number;
  off: number;
  percentageIn: number;
  inside: IInside;
  sequenceInsideIn: number;
}

export interface IData {
  result: IResult;
  mealList: IMeal[];
}
