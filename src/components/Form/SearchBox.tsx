import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/ModalCreateTask";
import { Input } from "./input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";
import { AuthContext } from "../../contexts/AuthContext";

interface SearchData {
  title: string;
}

interface SearchBoxProps {}

export const SearchBox = ({}: SearchBoxProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { searchTask } = useContext(TasksContext);
  const { accessToken } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<SearchData>({});

  const handleSearch: SubmitHandler<SearchData> = ({ title }: SearchData) => {
    searchTask(title, accessToken);
  };
  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        paddingX={["4", "8"]}
        paddingY="2"
        paddingBottom="6"
        borderBottomWidth="1px"
        borderBottomColor="gray.50"
        flexDirection={["column", "column", "row"]}
      >
        <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
          <Input
            placeholder="Pesquisar por tarefa"
            w={["100%", "100%", "35vw"]}
            {...register("title")}
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
          onClick={onOpen}
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </>
  );
};
