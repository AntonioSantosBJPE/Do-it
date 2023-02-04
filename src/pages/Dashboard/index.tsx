import { Button, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <Text>Dashboard Page</Text>;<Button onClick={signOut}>Logout</Button>
    </>
  );
};
