import { useBookStore } from "@/providers/bookStoreProvider";
import { ActionIcon, Box, Container, Group, Text } from "@mantine/core";
import { IconEdit, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import UpdateQuantity from "../UI/UpdateQuantity";

const OrderSummary = () => {
  const { cart } = useBookStore((state) => state);

  return (
    <div>
      <Container size="xl">
        <DataTable
          pinLastColumn
          withTableBorder
          borderRadius="md"
          striped
          highlightOnHover
          verticalSpacing="xs"
          columns={[
            { accessor: "book.title" },
            { accessor: "book.author" },
            { accessor: "book.price" },
            {
              accessor: "actions",
              title: <Box mx={6}>Quantity</Box>,
              render: (book) => <UpdateQuantity book={book} />,
            },
          ]}
          records={cart.items}
        />
      </Container>
      <Text fw={500} mt="sm">
        Total: Rs {cart.total.toFixed(2)}
      </Text>
      <Text mt="sm">Total Items: {cart.totalItems}</Text>
    </div>
  );
};

export default OrderSummary;
