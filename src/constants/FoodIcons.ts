import { FC } from "react";
import { SvgProps } from "react-native-svg";
import Almonds from "../assets/icons/food/Almonds.svg";
import Apricotkernel from "../assets/icons/food/Apricot kernel.svg";
import Baozi from "../assets/icons/food/Baozi.svg";
import Beer from "../assets/icons/food/Beer.svg";
import Cake from "../assets/icons/food/Cake.svg";
import Cashew from "../assets/icons/food/Cashew.svg";
import Chestnuts from "../assets/icons/food/Chestnuts.svg";
import CocaCola from "../assets/icons/food/Coca Cola.svg";
import Coffee_1 from "../assets/icons/food/Coffee-1.svg";
import Coffee from "../assets/icons/food/Coffee.svg";
import Doughnut from "../assets/icons/food/Doughnut.svg";
import Drink from "../assets/icons/food/Drink.svg";
import Hotdog from "../assets/icons/food/Hotdog.svg";
import Icecream_1 from "../assets/icons/food/Icecream-1.svg";
import Icecream from "../assets/icons/food/Icecream.svg";
import Juice from "../assets/icons/food/Juice.svg";
import Macadamia from "../assets/icons/food/Macadamia.svg";
import Mango from "../assets/icons/food/Mango.svg";
import Milk from "../assets/icons/food/Milk.svg";
import Peanut from "../assets/icons/food/Peanut.svg";
import Pecan from "../assets/icons/food/Pecan.svg";
import Pinenut from "../assets/icons/food/Pine nut.svg";
import Pineapple from "../assets/icons/food/Pineapple.svg";
import Pistachio from "../assets/icons/food/Pistachio.svg";
import Pizza from "../assets/icons/food/Pizza.svg";
import Pudding from "../assets/icons/food/Pudding.svg";
import Redjujube from "../assets/icons/food/Red jujube.svg";
import Sandwich from "../assets/icons/food/Sandwich.svg";
import Strawberry from "../assets/icons/food/Strawberry.svg";
import Sunflowerseed from "../assets/icons/food/Sunflower seed.svg";
import Sushi from "../assets/icons/food/Sushi.svg";
import Toast from "../assets/icons/food/Toast.svg";
import Walnut from "../assets/icons/food/Walnut.svg";
import Zongzi from "../assets/icons/food/Zongzi.svg";
import Lollipop from "../assets/icons/food/lollipop.svg";

export type IconMapping = { [key: string]: FC<SvgProps>; };

export const foodIcons: IconMapping = {
  "Almonds": Almonds,
  "Apricotkernel": Apricotkernel,
  "Baozi": Baozi,
  "Beer": Beer,
  "Cake": Cake,
  "Cashew": Cashew,
  "Chestnuts": Chestnuts,
  "CocaCola": CocaCola,
  "Coffee-1": Coffee_1,
  "Coffee": Coffee,
  "Doughnut": Doughnut,
  "Drink": Drink,
  "Hotdog": Hotdog,
  "Icecream-1": Icecream_1,
  "Icecream": Icecream,
  "Juice": Juice,
  "Macadamia": Macadamia,
  "Mango": Mango,
  "Milk": Milk,
  "Peanut": Peanut,
  "Pecan": Pecan,
  "Pinenut": Pinenut,
  "Pineapple": Pineapple,
  "Pistachio": Pistachio,
  "Pizza": Pizza,
  "Pudding": Pudding,
  "Redjujube": Redjujube,
  "Sandwich": Sandwich,
  "Strawberry": Strawberry,
  "Sunflowerseed": Sunflowerseed,
  "Sushi": Sushi,
  "Toast": Toast,
  "Walnut": Walnut,
  "Zongzi": Zongzi,
  "lollipop": Lollipop,
};

export type FoodCategories = {
  common: string[];
  fruits: string[];
  drinks: string[];
};

export const foodCategories: FoodCategories = {
  common: [
    "Almonds",
    "Apricotkernel",
    "Baozi",
    "Beer",
    "Cake",
    "Cashew",
    "Chestnuts",
    "CocaCola",
    "Coffee-1",
    "Coffee",
    "Doughnut",
    "Drink",
    "Hotdog",
    "Icecream-1",
    "Icecream",
    "Juice",
    "Macadamia",
    "Mango",
    "Milk",
    "Peanut",
    "Pecan",
    "Pinenut",
    "Pineapple",
    "Pistachio",
    "Pizza",
    "Pudding",
    "Redjujube",
    "Sandwich",
    "Strawberry",
    "Sunflowerseed",
    "Sushi",
    "Toast",
    "Walnut",
    "Zongzi",
    "lollipop",
  ],
  fruits: [
    "Mango",
    "Pineapple",
    "Strawberry",
  ],
  drinks: [
    "CocaCola",
    "Coffee-1",
    "Coffee",
    "Drink",
    "Juice",
    "Milk",
  ]
};