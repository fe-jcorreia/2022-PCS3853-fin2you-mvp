import { Button, Flex, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Flex
      flexDir="column"
      pos="relative"
      _before={{
        zIndex: "-1",
        content: '""',
        bgImage: "/img/main-banner.jpg",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        pos: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: "0.3",
      }}
    >
      <Flex
        maxW="720px"
        mx="auto"
        h="87vh"
        align="center"
        textAlign="center"
        justifyContent="center"
        flexDir="column"
      >
        <Heading fontSize="5xl" fontWeight="600" color="gray.800" mb="2rem">
          Sua gerência financeira em um só lugar
        </Heading>

        <Flex w="100%" align="center" justifyContent="space-between">
          <Button
            _hover={{
              color: "gray.800",
              background: "transparent",
              textDecor: "underline",
            }}
            bgColor="blue.800"
            p="2rem"
            fontSize="lg"
            borderRadius="full"
            color="white"
          >
            Conheça nossa empresa
          </Button>
          <Button
            _hover={{
              color: "gray.800",
              background: "transparent",
              textDecor: "underline",
            }}
            bgColor="blue.800"
            p="2rem"
            fontSize="lg"
            borderRadius="full"
            color="white"
          >
            Quero cuidar do meu dinheiro
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
