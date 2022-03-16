import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FiUser, FiLogIn, FiLogOut, FiTrello } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext";

export function Header() {
  const { isAuthenticated, user, signOut } = useContext(AuthContext);
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

        <HStack spacing="2rem">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" display="flex" ml="1rem" align="center">
                <Icon as={FiTrello} mr="0.5rem" fontSize="1.5rem" />
                Dashboard
              </Link>

              <Link
                href="/"
                display="flex"
                ml="1rem"
                align="center"
                onClick={signOut}
              >
                <Icon as={FiLogOut} mr="0.5rem" fontSize="1.5rem" />
                Logout
              </Link>

              <Box
                textAlign="right"
                pl="1rem"
                borderLeft="1px"
                borderColor="gray.300"
              >
                <Text>{user.name}</Text>
                <Text color="gray.500" fontSize="small">
                  {user.email}
                </Text>
              </Box>

              <Avatar size="md" name={user.name} />
            </>
          ) : (
            <>
              <Link href="/signup" display="flex" ml="2rem" align="center">
                <Icon as={FiLogIn} mr="0.5rem" fontSize="1.5rem" />
                Sign Up
              </Link>

              <Link href="/login" display="flex" ml="2rem" align="center">
                <Icon as={FiUser} mr="0.5rem" fontSize="1.5rem" />
                Login
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Flex>
  );
}
