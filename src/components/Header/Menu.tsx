import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { theme } from "../../styles/theme";
import { TasksContext } from "../../contexts/TasksContext";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}
export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { user, signOut } = useContext(AuthContext);
  const { clearStateTasks } = useContext(TasksContext);
  return (
    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay mt="80px" />
      <DrawerContent ml="auto" mt="80px" w={["450px", "350px"]}>
        <DrawerHeader
          borderBottomWidth="1px"
          borderBottomColor="gray.50"
          color="gray.400"
        >
          {user.name}
        </DrawerHeader>
        <DrawerBody>
          <Flex align="center">
            <Center
              w="60px"
              h="60px"
              bg="red.600"
              fontSize="2xl"
              borderRadius="md"
              as="button"
              onClick={() => {
                signOut();
                clearStateTasks();
              }}
              _hover={{ cursor: "pointer" }}
            >
              <FiLogOut color={theme.colors.white} />
            </Center>
            <Box ml="2">
              <Heading as="h2" fontSize="lg">
                Sair da minha conta
              </Heading>
              <Text color="gray.300" fontSize="small">
                Sair da minha conta agora
              </Text>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
