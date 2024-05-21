import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

import { ICartItem } from "@/lib/models/Cart";
import { useBookStore } from "@/providers/bookStoreProvider";

interface UpdateQuantityProps {
  book: ICartItem;
}

const UpdateQuantity = ({ book }: UpdateQuantityProps) => {
  const { updateCartItemQuantity } = useBookStore((state) => state);

  return (
    <Group gap={4} justify="space-between" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="subtle"
        color="blue"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          updateCartItemQuantity(book.book.id, 1);
        }}
      >
        <IconPlus size={16} />
      </ActionIcon>
      <Text>{book.quantity}</Text>
      <ActionIcon
        size="sm"
        variant="subtle"
        color="red"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          updateCartItemQuantity(book.book.id, -1);
        }}
      >
        <IconMinus size={16} />
      </ActionIcon>
    </Group>
  );
};

export default UpdateQuantity;
