import {
  Heading,
  HStack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
  theme,
  Image,
  Link,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
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
    labels: { show: false },
  },
  tooltip: { followCursor: true },
};

type Extracts = {
  id: string;
  description: string;
  amount: number;
  type: "CREDITO" | "DEBITO";
  userId: number;
  categoryId: number;
};

type CategoryAmouts = {
  lazer: number;
  alimentação: number;
  moradia: number;
  estudos: number;
  outros: number;
};

const Dashboard: NextPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [extracts, setExtracts] = useState([] as Extracts[]);
  const [categoriesAmouts, setCategoriesAmouts] = useState(
    {} as CategoryAmouts
  );

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

    async function getCategoriesAmouts() {
      try {
        const response = await api.get("categories", {
          params: { userId: user?.id },
        });
        const amountsArray = response.data.categories;
        let amounts: CategoryAmouts = {
          lazer: 0,
          alimentação: 0,
          moradia: 0,
          estudos: 0,
          outros: 0,
        };

        console.log(amountsArray);

        amountsArray?.forEach((item: any) => {
          if (item.id === ((user.id - 5) * 6) + 1) amounts.lazer = +item.total;
          else if (item.id === ((user.id - 5) * 6) + 3) amounts.alimentação = +item.total;
          else if (item.id === ((user.id - 5) * 6) + 4) amounts.moradia = +item.total;
          else if (item.id === ((user.id - 5) * 6) + 5) amounts.estudos = +item.total;
          else if (item.id === ((user.id - 5) * 6) + 6) amounts.outros = +item.total;
        });

        setCategoriesAmouts(amounts);
      } catch (err) {
        console.log(err);
      }
    }

    if (user) {
      getExtracts();
      getCategoriesAmouts();
    }
  }, [user]);

  const series = [
    {
      name: "Último mês",
      data: [
        {
          x: "Estudos",
          y: categoriesAmouts?.estudos,
        },
        {
          x: "Alimentação",
          y: categoriesAmouts?.alimentação,
        },
        {
          x: "Lazer",
          y: categoriesAmouts?.lazer,
        },
        {
          x: "Moradia",
          y: categoriesAmouts?.moradia,
        },
        {
          x: "Outros",
          y: categoriesAmouts?.outros,
        },
      ],
    },
  ];

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
                      userId={item.userId}
                      category={item.categoryId}
                      description={item.description}
                      amount={item.amount}
                      type={item.type}
                    />
                  ))}
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
