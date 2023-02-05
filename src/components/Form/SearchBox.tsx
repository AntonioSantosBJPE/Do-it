import { Button, Center, Flex } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "./input";

interface SearchBoxProps {}

export const SearchBox = ({}: SearchBoxProps) => {
  return (
    <Flex
      mt="6"
      paddingX={["4", "8"]}
      paddingY="2"
      paddingBottom="6"
      borderBottomWidth="1px"
      borderBottomColor="gray.50"
      flexDirection={["column", "column", "row"]}
    >
      <Flex as="form">
        <Input
          placeholder="Pesquisar por tarefa"
          w={["75vw", "75vw", "35vw"]}
          name="Title"
        />
        <Center
          as="button"
          borderRadius="8px"
          ml="2"
          w="65px"
          h="60px"
          fontSize="2xl"
          bg="purple.600"
          _hover={{
            bg: "purple.700",
          }}
        >
          <FaSearch color={theme.colors.white} />
        </Center>
      </Flex>
      <Button
        bg="purple.500"
        color="white"
        paddingX="16"
        mt={["4", "4", "0"]}
        ml={["0px", "0px", "4"]}
        h="60px"
        borderRadius="8px"
        _hover={{
          bg: "purple.600",
        }}
      >
        Adicionar uma nova tarefa
      </Button>
    </Flex>
  );
};
