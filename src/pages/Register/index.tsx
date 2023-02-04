import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { RegisterInfo } from "./RegisterInfo";
import { GoBackButton } from "./GoBackButton";

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

export const Register = () => {
  const [loading, setLoading] = useState(false);
  // const {  } = useContext(AuthContext);

  const isWideVersion = useBreakpointValue({
    false: false,
    md: true,
  });

  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  });

  const handleRegister: SubmitHandler<RegisterData> = (data) => {
    console.log(data);
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
        "linear(to-l, purple.800 65%, white 35%)",
        "linear(to-l, purple.800 65%, white 35%)",
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
        {isWideVersion ? (
          <>
            <GoBackButton top="50" left="35" action={() => navigate("/")} />
            <RegisterForm
              handleSubmit={handleSubmit}
              handleRegister={handleRegister}
              register={register}
              errors={errors}
              loading={loading}
            />
            <RegisterInfo />
          </>
        ) : (
          <>
            {" "}
            <GoBackButton top="10" left="75vw" action={() => navigate("/")} />
            <RegisterInfo />
            <RegisterForm
              handleSubmit={handleSubmit}
              handleRegister={handleRegister}
              register={register}
              errors={errors}
              loading={loading}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};
