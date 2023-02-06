import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { RegisterData } from ".";
import { Input } from "../../components/Form/input";

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<RegisterData>;
  handleRegister: SubmitHandler<RegisterData>;
  register: UseFormRegister<RegisterData>;
  errors: FieldErrors<RegisterData>;
  loading: boolean;
}

export const RegisterForm = ({
  handleSubmit,
  handleRegister,
  register,
  errors,
  loading,
}: LoginFormProps) => {
  return (
    <Grid
      as="form"
      mt={["4", "4", "0"]}
      w={["100%", "100%", "50%", "50%", "40%"]}
      padding="50px 25px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color="gray.900"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Heading size="lg">Crie sua conta!</Heading>

      <VStack mt="4" spacing="5">
        <Box w="100%">
          <Input
            icon={FaUser}
            placeholder="Digite seu nome"
            label="Nome"
            error={errors.name}
            {...register("name")}
          />
          {!errors.name && (
            <Text ml="1" mt="1" color="gray.300">
              Exemplo: nome
            </Text>
          )}
        </Box>
        <Box w="100%">
          <Input
            icon={FaEnvelope}
            placeholder="Digite seu login"
            label="Login"
            type="text"
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
        <Input
          icon={FaLock}
          placeholder="Confirme sua senha"
          label="Confirmação de senha"
          type="password"
          error={errors.confirm_password}
          {...register("confirm_password")}
        />
      </VStack>

      <Button
        bg="purple.800"
        w="100%"
        color="white"
        h="60px"
        borderRadius="8px"
        mt="8"
        _hover={{ background: "purple.900" }}
        type="submit"
        isLoading={loading}
      >
        Finalizar cadastro
      </Button>
    </Grid>
  );
};
