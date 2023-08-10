import { useOutsideClick } from "outsideclick-react";
import { useState, Dispatch, SetStateAction } from "react";

export interface Position {
  x: number;
  y: number;
}
export const useDataMessage = (
  setOverflow: Dispatch<SetStateAction<string>>
) => {
  const [xYPosistion, setXyPosistion] = useState<Position>({ x: 0, y: 0 });
  const [dropDown, setDropDown] = useState<boolean>(false);
  const handleOutsideClick = () => {
    setDropDown(false);
    setOverflow("auto");
  };
  const ref = useOutsideClick(handleOutsideClick);
  return {
    xYPosistion: xYPosistion,
    setXyPosistion: setXyPosistion,
    dropDown: dropDown,
    setDropDown: setDropDown,
    ref: ref,
  };
};
