import {
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Input } from "../components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";

type LoginAccountFormData = {
  email: string;
  password: string;
};

const signInForSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Precisa ser um email válido")
    .trim(),
  password: yup.string().required("Senha obrigatória").trim(),
});

const Login: NextPage = () => {
  const toast = useToast();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(signInForSchema),
  });
  const errors = formState.errors;

  const handleLogin: SubmitHandler<LoginAccountFormData> = (values) => {
    console.log(values);

    toast({
      title: "Sucesso",
      description: "Você entrou na sua conta",
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
        onSubmit={handleSubmit(handleLogin)}
        h="85vh"
        spacing="1rem"
        alignItems="start"
        justifyContent="center"
      >
        <Heading fontSize="2xl" fontWeight="600" color="gray.800">
          Entre ou crie sua conta e comece a cuidar do seu dinheiro
        </Heading>
        <Input
          type="email"
          label="Email*"
          placeholder="Email"
          icon={FiMail}
          error={errors.email}
          {...register("email")}
        />
        <Input
          label="Senha*"
          type="password"
          placeholder="Senha"
          icon={FiLock}
          error={errors.password}
          {...register("password")}
        />

        <Text fontSize="xs">
          <Link href="/">
            <u>Esqueci minha senha</u>
          </Link>{" "}
          ou{" "}
          <Link href="/signup">
            <u>não tenho conta</u>
          </Link>{" "}
        </Text>

        <Button
          w="100%"
          type="submit"
          mt="2rem"
          colorScheme="red"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </VStack>

      <Image src="/img/money-care.png" alt="money-care" />
    </HStack>
  );
};

export default Login;
