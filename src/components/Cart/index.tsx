"use client";

import Link from "next/link";
import { Alert, Box, Button, Container, Drawer, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import { useBookStore } from "@/providers/bookStoreProvider";
import UpdateQuantity from "../UI/UpdateQuantity";
import { IconMoodEmpty } from "@tabler/icons-react";

function CartDrawer() {
  const { isCartOpen, toggleCardDrawer } = useBookStore((state) => state);
  const { cart } = useBookStore((state) => state);

  const closeCart = () => {
    toggleCardDrawer();
  };

  return (
    <Drawer
      position="right"
      padding="md"
      opened={isCartOpen}
      onClose={closeCart}
      title="Cart"
      zIndex={10000}
    >
      {cart.items.length > 0 ? (
        <>
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
          <Text mt="sm" size="sm">
            Total Items: {cart.totalItems}
          </Text>
          <Button
            component={Link}
            onClick={closeCart}
            href="/checkout"
            w="100%"
            mt="xl"
          >
            Checkout
          </Button>
        </>
      ) : (
        <Alert
          variant="outline"
          color="yellow"
          radius="md"
          title="Cart is empty!"
          icon={<IconMoodEmpty />}
          mt="xl"
          w="100%"
        />
      )}
    </Drawer>
  );
}

export default CartDrawer;
