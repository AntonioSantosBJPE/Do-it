import { Box, Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext";

export const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <Box>
      <Header />
    </Box>
  );
};
