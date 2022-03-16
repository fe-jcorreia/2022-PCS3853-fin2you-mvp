import {
  Heading,
  HStack,
  Icon,
  Table,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  theme,
  Image,
  Link,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import {
  FiBook,
  FiDollarSign,
  FiShoppingCart,
  FiFilm,
  FiHome,
  FiShoppingBag,
  FiEdit,
} from "react-icons/fi";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DescriptionItem } from "../components/DescriptionItem";
import { api } from "../services/api";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    foreColor: theme.colors.gray[800],
    fontFamily: theme.fonts.body,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["Estudos", "Alimentação", "Lazer", "Moradia", "Outros"],
  },
  tooltip: { followCursor: true },
};

const series = [
  {
    name: "Último mês",
    data: [
      {
        x: "Estudos",
        y: 1850,
      },
      {
        x: "Alimentação",
        y: 200,
      },
      {
        x: "Lazer",
        y: 100,
      },
      {
        x: "Moradia",
        y: 1200,
      },
      {
        x: "Outros",
        y: 1500,
      },
    ],
  },
];

type Extracts = {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  userId: number;
};

const Dashboard: NextPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [extracts, setExtracts] = useState([] as Extracts[]);

  useEffect(() => {
    async function getExtracts() {
      try {
        const response = await api.get("extracts", {
          params: { userId: user?.id },
        });

        setExtracts(response.data.extracts);
      } catch (err) {
        console.log(err);
      }
    }

    if (user) {
      getExtracts();
    }
  }, [user]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <VStack maxW="1080px" mx="auto" spacing="2rem" align="start">
            <Heading fontSize="3xl" fontWeight="600" color="gray.800" my="2rem">
              Olá {user.name},
            </Heading>
            <HStack spacing="3rem" align="start">
              <Table variant="simple" mb="5rem">
                <Thead>
                  <Tr>
                    <Th>Descrição</Th>
                    <Th>Valor</Th>
                    <Th>Categoria</Th>
                    <Th>Editar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {extracts?.map((item) => (
                    <DescriptionItem
                      key={item.id}
                      id={item.id}
                      description={item.description}
                      amount={item.amount}
                      type={item.type}
                    />
                  ))}

                  {/* <Tr>
                    <Td>Salário mensal</Td>
                    <Td color="green">+R$4.500,00</Td>
                    <Td>
                      <Tag size="lg" colorScheme="gray" borderRadius="full">
                        <Icon as={FiDollarSign} mr="0.5rem" />
                        <TagLabel>Recebíveis</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Compras de supermercado</Td>
                    <Td color="red">-R$200,00</Td>
                    <Td>
                      <Tag size="lg" colorScheme="green" borderRadius="full">
                        <Icon as={FiShoppingCart} mr="0.5rem" />
                        <TagLabel>Alimentação</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Skin no League of Legends</Td>
                    <Td color="red">-R$100,00</Td>
                    <Td>
                      <Tag size="lg" colorScheme="yellow" borderRadius="full">
                        <Icon as={FiFilm} mr="0.5rem" />
                        <TagLabel>Lazer</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Aluguel</Td>
                    <Td color="red">-R$1200,00</Td>
                    <Td>
                      <Tag size="lg" colorScheme="red" borderRadius="full">
                        <Icon as={FiHome} mr="0.5rem" />
                        <TagLabel>Moradia</TagLabel>
                      </Tag>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Ave rara contrabandeada</Td>
                    <Td color="red">-R$1500,00</Td>
                    <Td>
                      <Tag size="lg" colorScheme="purple" borderRadius="full">
                        <Icon as={FiShoppingBag} mr="0.5rem" />
                        <TagLabel>Outros</TagLabel>
                      </Tag>
                    </Td>
                  </Tr> */}
                </Tbody>
              </Table>

              <Chart
                options={options}
                series={series}
                type="bar"
                height="350px"
              />
            </HStack>
          </VStack>
        </>
      ) : (
        <>
          <HStack maxW="1080px" mx="auto" spacing="3rem">
            <VStack
              h="85vh"
              spacing="1rem"
              alignItems="start"
              justifyContent="center"
            >
              <Heading fontSize="3xl" fontWeight="600" color="gray.800">
                Ops, parece que você não está logado ainda,
              </Heading>
              <Heading fontSize="2xl" fontWeight="500" color="gray.800">
                Entre ou crie sua conta :)
              </Heading>

              <Link href="/login">
                <Button colorScheme="red">Entrar</Button>
              </Link>
            </VStack>

            <Image src="/img/money-care.png" alt="money-care" />
          </HStack>
        </>
      )}
    </>
  );
};

export default Dashboard;
