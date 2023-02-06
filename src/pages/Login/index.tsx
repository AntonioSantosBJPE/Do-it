import { Flex } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginInfo } from "./LoginInfo";
import { LoginForm } from "./LoginForm";

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export interface SingInData {
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
        <LoginInfo />
        <LoginForm
          handleSubmit={handleSubmit}
          handleSignIn={handleSignIn}
          register={register}
          errors={errors}
          loading={loading}
        />
      </Flex>
    </Flex>
  );
};
