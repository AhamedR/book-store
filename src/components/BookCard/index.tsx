import { Card, Text, Group, Center, Button } from "@mantine/core";
import { IconCategory, IconFeather } from "@tabler/icons-react";
import { IconShoppingCart } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

import IBook from "@/lib/models/Book";
import classes from "./index.module.scss";
import CoverImage from "../UI/CoverImage";
import { useBookStore } from "@/providers/bookStoreProvider";

interface BookCardProps extends IBook {}

const BookCard = (book: BookCardProps) => {
  const { title, author, coverImage, price, category, description } = book;
  const { addToCart } = useBookStore((state) => state);

  const handleCart = () => {
    addToCart(book);
    notifications.show({
      withBorder: true,
      title: "Item Added",
      message: `${book.title} added to your Cart`,
      icon: <IconShoppingCart />,
    });
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <CoverImage
          title={title}
          imageUrl={coverImage}
          fallbackUrl="https://fakeimg.pl/500x400?text=Cover&font=bebas"
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{title}</Text>
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Details
        </Text>

        <Group gap={8} mb={-8}>
          <Center>
            <IconFeather size="1.05rem" className={classes.icon} stroke={1.5} />
            <Text size="xs">{author}</Text>
          </Center>
          <Center>
            <IconCategory
              size="1.05rem"
              className={classes.icon}
              stroke={1.5}
            />
            <Text size="xs">{category}</Text>
          </Center>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              Rs {price}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              only
            </Text>
          </div>

          <Button onClick={handleCart} radius="xl" style={{ flex: 1 }}>
            Add to Cart
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default BookCard;
