import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}
interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  handleClick: (task: Task) => void;
}

export const TaskList = ({ tasks, loading, handleClick }: TaskListProps) => {
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
        {loading ? (
          <CardSkeleton repeatCount={6} />
        ) : (
          tasks.map((task) => (
            <Card key={task.id} task={task} action={handleClick} />
          ))
        )}
      </Grid>
    </Box>
  );
};
