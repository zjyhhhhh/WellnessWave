import { FC } from "react";
import Milk from "../assets/icons/food/Milk.svg";
import Sandwich from "../assets/icons/food/Sandwich.svg";
import { SvgProps } from "react-native-svg";

type IconMapping = {
	[key: string]: FC<SvgProps>;
};

export const foodIcons: IconMapping = {
	Milk,
	Sandwich,
};