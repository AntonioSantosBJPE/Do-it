import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { TasksContext } from "../../contexts/TasksContext";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { signOut, user, accessToken } = useContext(AuthContext);
  const { tasks, loadTasks } = useContext(TasksContext);

  useEffect(() => {
    loadTasks(user.id, accessToken)
      .then((response) => {
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

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
        {tasks.map((task) => (
          <Card key={task.id} task={task} />
        ))}
      </Grid>
    </Box>
  );
};
