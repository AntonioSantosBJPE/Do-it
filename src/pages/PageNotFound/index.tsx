import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/notfound.svg";
interface PageNotFoundProps {}
export const PageNotFound = ({}: PageNotFoundProps) => {
  const navigate = useNavigate();
  return (
    <Flex
      alignItems="center"
      justifyContent="space-evenly"
      padding={["10px 15px", "10px 15px", "10px 15px", "0px"]}
      height={["auto", "auto", "100vh", "100vh"]}
      flexDirection={["column-reverse", "column-reverse", "row"]}
    >
      <Box mt="4">
        <Heading>Oooops!</Heading>
        <Text mt="4">
          Não encontramos a página que você procurou, <br />
          <b>vamos tentar novamente.</b>
        </Text>
        <Button
          mt="4"
          bg="red.600"
          h="60px"
          w="100%"
          color="white"
          _hover={{ bg: "red.700" }}
          onClick={() => navigate("/")}
        >
          Ir para as minhas tarefas
        </Button>
      </Box>
      <Image src={notFoundImg} alt="notfound" />
    </Flex>
  );
};
