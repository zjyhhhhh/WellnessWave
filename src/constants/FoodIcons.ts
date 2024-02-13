import { FC } from "react";
import Milk from "../assets/icons/food/Milk.svg";
import Sandwich from "../assets/icons/food/Sandwich.svg";
import { SvgProps } from "react-native-svg";
import Pizza from "../assets/icons/food/Pizza.svg";
import CocaCola from "../assets/icons/food/Coca Cola.svg";

type IconMapping = {
	[key: string]: FC<SvgProps>;
};

export const foodIcons: IconMapping = {
	Milk: Milk,
	Sandwich: Sandwich,
	Pizza: Pizza,
	"Coca-Cola": CocaCola,
};