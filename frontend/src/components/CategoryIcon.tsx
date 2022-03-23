import { Icon } from "@chakra-ui/react";
import {
  FiBook,
  FiDollarSign,
  FiFilm,
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
} from "react-icons/fi";

interface CategoryIconProps {
  categoryType: string;
}

export function CategoryIcon({ categoryType }: CategoryIconProps) {
  const icons = {
    lazer: "FiFilm",
    recebíveis: "FiDollarSign",
    alimentação: "FiShoppingCart",
    moradia: "FiHome",
    estudos: "FiBook",
    outros: "FiShoppingBag",
  };

  return (
    <>
      {categoryType === icons.lazer && <Icon as={FiFilm} mr="0.5rem" />}
      {categoryType === icons.recebíveis && (
        <Icon as={FiDollarSign} mr="0.5rem" />
      )}
      {categoryType === icons.alimentação && (
        <Icon as={FiShoppingCart} mr="0.5rem" />
      )}
      {categoryType === icons.moradia && <Icon as={FiHome} mr="0.5rem" />}
      {categoryType === icons.estudos && <Icon as={FiBook} mr="0.5rem" />}
      {categoryType === icons.outros && <Icon as={FiShoppingBag} mr="0.5rem" />}
    </>
  );
}
