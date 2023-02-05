import { Center, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { FaTh } from "react-icons/fa";
import logo from "../../assets/logo-min.svg";
import { theme } from "../../styles/theme";
import { Menu } from "./Menu";

interface HeaderProps {}
export const Header = ({}: HeaderProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Flex
      borderBottom="1px"
      borderBottomColor="#f5f5f5"
      paddingX="8"
      paddingY="2"
    >
      <Flex align="center">
        <Image src={logo} />
        <Heading ml="4" size="lg">
          Dashboard
        </Heading>
      </Flex>
      <Center as="button" ml="auto" fontSize="2rem" onClick={onToggle}>
        <FaTh color={theme.colors.gray["300"]} />
      </Center>
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
