import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import logoPrimary from "../../assets/logo-primary.svg";
import { Input } from "../../components/Form/input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SingInData {
  email: string;
  password: string;
}
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SingInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn: SubmitHandler<SingInData> = (data) => {
    setLoading(true);
    signIn(data)
      .then((_) => {
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      padding={["10px 15px", "10px 15px", "10px 15px", "0px"]}
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 65%, white 35%)",
      ]}
      color="white"
    >
      <Flex
        w={["100%", "100%", "90%", "70%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
        gap="5"
      >
        <Grid w={["100%", "100%", "40%", "40%"]} paddingRight="100px">
          <Image
            src={logoPrimary}
            alt="doit"
            boxSize={["120px", "120px", "150px", "150px"]}
          />
          <Heading as="h1" mt="4" mb="2" w="100%">
            {" "}
            O jeito fácil, grátis
          </Heading>
          <Text w="250px">
            Flexível e atrativo de gerenciar{" "}
            <b>seus projetos em um única plataforma</b>
          </Text>
        </Grid>

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
      </Flex>
    </Flex>
  );
};
