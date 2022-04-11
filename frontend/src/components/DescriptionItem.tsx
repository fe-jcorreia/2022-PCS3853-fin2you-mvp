import {
  Icon,
  IconButton,
  Select,
  Tag,
  TagLabel,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiBook, FiCheck, FiEdit } from "react-icons/fi";
import { api } from "../services/api";
import { useRouter } from "next/router";
import { CategoryIcon } from "./CategoryIcon";

interface DescriptionItemProps {
  id: string;
  userId: number;
  description: string;
  amount: number;
  type: "CREDITO" | "DEBITO";
  category: number;
}

export function DescriptionItem({
  id,
  userId,
  description,
  amount,
  type,
  category,
}: DescriptionItemProps) {
  const [editable, setEditable] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const router = useRouter();

  const categories = {
    lazer: (userId - 5) * 6 + 1,
    recebíveis: (userId - 5) * 6 + 2,
    alimentação: (userId - 5) * 6 + 3,
    moradia: (userId - 5) * 6 + 4,
    estudos: (userId - 5) * 6 + 5,
    outros: (userId - 5) * 6 + 6,
  };

  const icons = {
    lazer: "FiFilm",
    recebíveis: "FiDollarSign",
    alimentação: "FiShoppingCart",
    moradia: "FiHome",
    estudos: "FiBook",
    outros: "FiShoppingBag",
  };

  const iconsColors = {
    lazer: "yellow",
    recebíveis: "gray",
    alimentação: "green",
    moradia: "red",
    estudos: "cyan",
    outros: "purple",
  };

  function getKeyByValue(object: any, value: number) {
    return Object.keys(object)[value - ((userId - 5) * 6 + 1)];
  }

  async function handleEditDescription() {
    if (newCategory != null) {
      try {
        await api.patch(`extracts/${id}`, { category: newCategory, userId });
      } catch (err) {
        console.log(err);
      }
    }
    setEditable(false);
    router.reload();
  }

  return (
    <Tr>
      <Td>{description}</Td>
      <Td color={type === "DEBITO" ? "red" : "green"}>
        {type === "DEBITO" ? "-" : ""}
        R${amount}
      </Td>
      <Td flexDirection="row">
        {editable ? (
          <Select
            placeholder="Selecionar"
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option value="estudos">Estudos</option>
            <option value="recebíveis">Recebíveis</option>
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="moradia">Moradia</option>
            <option value="outros">Outros</option>
          </Select>
        ) : (
          <>
            {category && (
              <Tag
                size="lg"
                colorScheme={iconsColors[getKeyByValue(categories, category)]}
                borderRadius="full"
              >
                <CategoryIcon
                  categoryType={icons[getKeyByValue(categories, category)]}
                />
                <TagLabel>
                  {getKeyByValue(categories, category) &&
                    getKeyByValue(categories, category)
                      .charAt(0)
                      .toUpperCase() +
                      getKeyByValue(categories, category).slice(1)}
                </TagLabel>
              </Tag>
            )}
          </>
        )}
      </Td>
      <Td>
        <IconButton
          aria-label="edit-description"
          variant="ghost"
          onClick={editable ? handleEditDescription : () => setEditable(true)}
          icon={<Icon as={editable ? FiCheck : FiEdit} fontSize="1.5rem" />}
        />
      </Td>
    </Tr>
  );
}
