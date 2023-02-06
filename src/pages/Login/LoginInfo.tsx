import { Grid, Heading, Image, Text } from "@chakra-ui/react";
import logoPrimary from "../../assets/logo-primary.svg";
export const LoginInfo = () => {
  return (
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
  );
};
