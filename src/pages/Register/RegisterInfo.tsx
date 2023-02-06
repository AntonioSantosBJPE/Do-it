import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  theme,
  VStack,
} from "@chakra-ui/react";
import { FaForward } from "react-icons/fa";
import logoPrimary from "../../assets/logo-primary.svg";
import simpleIcon from "../../assets/simpleIcon.svg";

export const RegisterInfo = () => {
  return (
    <>
      <Grid
        w={["100%", "100%", "50%", "50%"]}
        paddingLeft={["0", "0", "100px"]}
      >
        <Image
          src={logoPrimary}
          alt="doit"
          boxSize={["120px", "120px", "150px", "150px"]}
        />
        <VStack spacing="14" mt={["10px", "10px", "50px"]}>
          <Flex w="100%">
            <Center borderRadius="5px" bg="white" w="50px" h="50px">
              <FaForward color={theme.colors.purple["800"]} size={25} />
            </Center>
            <Box ml="4">
              <Heading size="lg">Agilidade</Heading>
              <Text>
                Agilize seus projetos com rapidez <br />e muita perfomace
              </Text>
            </Box>
          </Flex>
          <Flex w="100%">
            <Center borderRadius="5px" bg="white" w="50px" h="50px">
              <Image src={simpleIcon} w="25px" h="25px" />
            </Center>
            <Box ml="4">
              <Heading size="lg">Simplicidade</Heading>
              <Text>
                Armazene seus projetos em uma
                <br /> interface altamente usual
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Grid>
    </>
  );
};
