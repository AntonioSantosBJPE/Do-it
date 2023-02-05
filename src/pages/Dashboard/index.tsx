import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext";

export const Dashboard = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid
        templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
        gap="10"
        paddingX={["4", "8"]}
        mt="8"
        w="100%"
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} />
        ))}
      </Grid>
    </Box>
  );
};
