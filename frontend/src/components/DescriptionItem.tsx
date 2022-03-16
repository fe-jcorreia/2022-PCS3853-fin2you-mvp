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

interface DescriptionItemProps {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

type Category =
  | "Estudos"
  | "Recebíveis"
  | "Alimentação"
  | "Lazer"
  | "Moradia"
  | "Outros";
type ItemColor = "cyan" | "gray" | "green" | "yellow" | "red" | "purple";
type ItemIcon =
  | "FiBook"
  | "FiDollarSign"
  | "FiShoppingCart"
  | "FiFilm"
  | "FiHome"
  | "FiShoppingBag";

export function DescriptionItem({
  id,
  description,
  amount,
  type,
}: DescriptionItemProps) {
  const [editable, setEditable] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  function handleEditDescription() {
    console.log(newCategory);
    setEditable(false);
  }

  return (
    <Tr>
      <Td>{description}</Td>
      <Td color={type === "debit" ? "red" : "green"}>
        {type === "debit" ? "-" : ""}
        R${amount},00
      </Td>
      <Td flexDirection="row">
        {editable ? (
          <Select onChange={(e) => setNewCategory(e.target.value)}>
            <option value="estudos">Estudos</option>
            <option value="recebíveis">Recebíveis</option>
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="moradia">Moradia</option>
            <option value="outros">Outros</option>
          </Select>
        ) : (
          <Tag size="lg" colorScheme="cyan" borderRadius="full">
            <Icon as={FiBook} mr="0.5rem" />
            <TagLabel>Estudos</TagLabel>
          </Tag>
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
