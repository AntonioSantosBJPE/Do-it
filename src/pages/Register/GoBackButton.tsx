import { Center } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

interface GoBackButtonProps {
  top: string;
  left: string;
  action: () => void;
}

export const GoBackButton = ({ top, left, action }: GoBackButtonProps) => {
  return (
    <Center
      as="button"
      position="absolute"
      top={top}
      left={left}
      w={["60px", "80px"]}
      h="60px"
      bg="purple.500"
      fontSize="2xl"
      borderRadius="md"
      _hover={{
        bg: "purple.400",
      }}
      onClick={action}
    >
      <FaArrowLeft color="white" />
    </Center>
  );
};
