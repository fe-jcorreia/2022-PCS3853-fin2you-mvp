import { Flex, Icon, Image, Link } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

export function Header() {
  return (
    <Flex bg="white" boxShadow="sm" pos="sticky" top="0" as="header" zIndex="3">
      <Flex
        maxW="1080px"
        mx="auto"
        h="5rem"
        w="100%"
        align="center"
        justify="space-between"
      >
        <Link href="/" align="center" w="8rem">
          <Image src="/img/logo.png" h="auto" w="100%" alt="logo" />
        </Link>

        <Link href="/login" display="flex" ml="2rem" align="center">
          <Icon as={FiUser} mr="0.5rem" fontSize="1.5rem" />
          Login
        </Link>
      </Flex>
    </Flex>
  );
}
