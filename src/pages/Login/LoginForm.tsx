import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { SingInData } from ".";
import { Input } from "../../components/Form/input";

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<SingInData>;
  handleSignIn: SubmitHandler<SingInData>;
  register: UseFormRegister<SingInData>;
  errors: FieldErrors<SingInData>;
  loading: boolean;
}

export const LoginForm = ({
  handleSubmit,
  handleSignIn,
  register,
  errors,
  loading,
}: LoginFormProps) => {
  return (
    <Grid
      as="form"
      mt={["4", "4", "0"]}
      w={["100%", "100%", "50%", "50%", "40%"]}
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color="gray.900"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Heading size="lg">Bem vindo de volta!</Heading>

      <VStack mt="4" spacing="5">
        <Box w="100%">
          <Input
            icon={FaEnvelope}
            placeholder="Digite seu login"
            label="Login"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml="1" mt="1" color="gray.300">
              Exemplo: nome@gmail.com
            </Text>
          )}
        </Box>

        <Input
          icon={FaLock}
          placeholder="Digite sua senha"
          label="Senha"
          type="password"
          error={errors.password}
          {...register("password")}
        />
      </VStack>
      <VStack mt="4" spacing="5">
        <Button
          bg="purple.800"
          w="100%"
          color="white"
          h="60px"
          borderRadius="8px"
          _hover={{ background: "purple.900" }}
          type="submit"
          isLoading={loading}
        >
          Entrar
        </Button>
        <Text color="gray.400">Ainda não possui uma conta?</Text>
        <Button
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="60px"
          borderRadius="8px"
          _hover={{ background: "gray.200" }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
