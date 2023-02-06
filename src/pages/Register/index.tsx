import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { RegisterInfo } from "./RegisterInfo";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";

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

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

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

  const handleRegister: SubmitHandler<RegisterData> = ({
    name,
    email,
    password,
  }) => {
    setLoading(true);
    api
      .post("/register", { name, email, password })
      .then((response) => {
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  return (
    <>
      <ModalSuccess
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        messagePrimary="Seu cadastro deu super certo, <b>vamos lá</b> !"
        messageSecondary="Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo..."
        buttonMessage="Ir para o Login agora"
        buttonAction={() => navigate("/")}
      />
      <ModalError
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        errorMessage="Email já está em uso!"
        messageSecondary="Você já pode tentar novamente, <b>clicando</b> no botão acima ou aguarde alguns minutos..."
      />
      <Flex
        alignItems="center"
        justifyContent="center"
        padding={["10px 15px", "10px 15px", "10px 15px", "0px"]}
        height={["auto", "auto", "auto ", "auto"]}
        minHeight={["auto", "auto", "100vh", "100vh"]}
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
    </>
  );
};
