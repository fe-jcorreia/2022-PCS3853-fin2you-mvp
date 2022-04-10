import {
  Button,
  Checkbox,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../components/Input";
import {
  FiClipboard,
  FiMail,
  FiUser,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Router from "next/router";

type CreateAccountFormData = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

const signInForSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório").trim(),
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Precisa ser um email válido")
    .trim(),
  cpf: yup.string().required("CPF obrigatório").trim(),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Senha precisa ter ao menos 8 caracteres")
    .trim(),
});

const Signup: NextPage = () => {
  const { signUp, isAuthenticated } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(signInForSchema),
  });
  const errors = formState.errors;
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const handleCreateAccount: SubmitHandler<CreateAccountFormData> = async (
    credentials
  ) => {
    const response = await signUp(credentials);

    if (response) {
      toast({
        title: "Criação de conta falhou",
        description: `${response.error}`,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }

    reset();
  };

  return (
    <>
      {!isAuthenticated && (
        <HStack maxW="1080px" mx="auto" spacing="3rem">
          <VStack
            as="form"
            onSubmit={handleSubmit(handleCreateAccount)}
            h="85vh"
            maxW="720px"
            mx="auto"
            spacing="1rem"
            alignItems="start"
            justifyContent="center"
          >
            <Heading fontSize="2xl" fontWeight="600" color="gray.800">
              Comece a cuidar do seu dinheiro com a gente
            </Heading>
            <Input
              type="name"
              label="Nome*"
              placeholder="Nome"
              icon={FiUser}
              error={errors.name}
              {...register("name")}
            />
            <Input
              type="email"
              label="Email*"
              placeholder="Email"
              icon={FiMail}
              error={errors.email}
              {...register("email")}
            />
            <Input
              label="CPF*"
              type="cpf"
              placeholder="XXX.XXX.XXX-XX"
              icon={FiClipboard}
              error={errors.cpf}
              {...register("cpf")}
            />
            <Input
              label="Senha*"
              type="password"
              placeholder="Senha"
              icon={FiLock}
              error={errors.password}
              {...register("password")}
            />

            <Checkbox required type="therms">
              Aceito os termos de uso - Open Banking
            </Checkbox>
            <Button variant="ghost" size='xs' onClick={onOpen}>
              Termos Open Banking
            </Button>

            <Button
              w="100%"
              mt="2rem"
              colorScheme="red"
              type="submit"
              isLoading={formState.isSubmitting}
            >
              Criar conta
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Open Banking</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign="center">
                  <Icon as={FiCheckCircle} boxSize="10rem" color="green.500" />
                  <br />
                  <br />
                  Desejo permitir a utilização dos meus dados bancários na
                  aplicação Open Banking Fin2You.
                </ModalBody>

                <ModalFooter>
                  <Button
                    onClick={onClose}
                    isLoading={formState.isSubmitting}
                    colorScheme="red"
                    mr={3}
                  >
                    Aceitar
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Não aceitar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>

          <Image src="/img/money-care.png" alt="money-care" />
        </HStack>
      )}
    </>
  );
};

export default Signup;
