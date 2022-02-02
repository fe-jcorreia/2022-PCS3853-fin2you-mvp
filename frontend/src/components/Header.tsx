import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { FiUser, FiArrowRightCircle } from "react-icons/fi";

export function Header() {
  return (
    <Flex bg="white" boxShadow="sm" pos="sticky" top="0" as="header" zIndex="3">
      <Flex
        maxW="1080px"
        mx="auto"
        h="15vh"
        w="100%"
        align="center"
        justify="space-between"
      >
        <Link href="/" align="center">
          <HStack spacing={0}>
            <Heading fontSize="5xl" fontWeight="600" color="blue.800">
              Fin
            </Heading>
            <Heading fontSize="5xl" fontWeight="600" color="red.500">
              2
            </Heading>
            <Heading fontSize="5xl" fontWeight="600" color="blue.800">
              You
            </Heading>
          </HStack>
        </Link>

        <HStack spacing='2rem'>
          <Link href="/signup" display="flex" ml="2rem" align="center">
            <Icon as={FiArrowRightCircle} mr="0.5rem" fontSize="1.5rem" />
            Sign Up
          </Link>

          <Link href="/login" display="flex" ml="2rem" align="center">
            <Icon as={FiUser} mr="0.5rem" fontSize="1.5rem" />
            Login
          </Link>
        </HStack>
      </Flex>
    </Flex>
  );
}
