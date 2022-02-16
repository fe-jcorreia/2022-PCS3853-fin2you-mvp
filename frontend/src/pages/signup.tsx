import {
  Button,
  Heading,
  HStack,
  Image,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../components/Input";
import { FiClipboard, FiMail, FiUser, FiLock } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";

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
  password: yup.string().required("Senha obrigatória").trim(),
});

const Signup: NextPage = () => {
  const toast = useToast();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(signInForSchema),
  });
  const errors = formState.errors;

  const handleCreateAccount: SubmitHandler<CreateAccountFormData> = (
    values
  ) => {
    console.log(values);

    toast({
      title: "Sucesso",
      description: "Sua conta foi criada",
      status: "success",
      position: "top-right",
      duration: 2000,
      isClosable: true,
    });
    reset();
  };

  return (
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

        <Button
          w="100%"
          type="submit"
          mt="2rem"
          colorScheme="red"
          isLoading={formState.isSubmitting}
        >
          Criar conta
        </Button>
      </VStack>

      <Image src="/img/money-care.png" alt="money-care" />
    </HStack>
  );
};

export default Signup;