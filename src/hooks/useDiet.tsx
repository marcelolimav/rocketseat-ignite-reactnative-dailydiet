import { useContext } from "react";

import { DietContext, DietContextDataProps } from "../context/DietContext";

export function useDiet(): DietContextDataProps {
  const context = useContext(DietContext);
  return context;
}
