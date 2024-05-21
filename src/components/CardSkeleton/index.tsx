import { Card, Skeleton } from "@mantine/core";
import classes from "../BookCard/index.module.scss";

const CardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => (
        <Card withBorder radius="md" className={classes.card} key={index}>
          <Skeleton height={200} mb="xl" />
          <Skeleton height={8} radius="xl" mb="sm" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" mb="sm" />
          <Skeleton height={8} mt={6} width="40%" radius="xl" />
          <Skeleton height={8} mt={6} width="30%" radius="xl" />
          <Skeleton height={8} mt={6} width="30%" radius="xl" />
          <Skeleton height={36} right={0} width="30%" radius="xl" mt="xl" />
        </Card>
      ))}
    </>
  );
};

export default CardSkeleton;
