"use client";

import {
  Group,
  Burger,
  Container,
  Button,
  Box,
  Drawer,
  ScrollArea,
  rem,
  Badge,
  NavLink,
} from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { IconBooks, IconShoppingCart } from "@tabler/icons-react";

import classes from "./index.module.scss";
import { useBookStore } from "@/providers/bookStoreProvider";

const NavBar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { toggleCardDrawer, cart } = useBookStore((state) => state);

  const openCart = () => {
    toggleCardDrawer();
  };

  return (
    <Box pb={1} component="nav">
      <header className={classes.header}>
        <Container size="md">
          <div className={classes.inner}>
            <Group visibleFrom="sm">
              <NavLink
                href="/"
                component={Link}
                label="Book Store"
                leftSection={<IconBooks size="1rem" stroke={1.5} />}
              />
            </Group>
            <Group visibleFrom="sm">
              <Button onClick={openCart} disabled={cart.totalItems === 0}>
                <IconShoppingCart /> Cart
                {cart.totalItems ? (
                  <Badge ml={"xs"} variant="white" color="blue" circle>
                    {cart.totalItems}
                  </Badge>
                ) : null}
              </Button>
            </Group>
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              size="sm"
              hiddenFrom="sm"
            />
          </div>
        </Container>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Book Store"
        hiddenFrom="sm"
        zIndex={9999}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group justify="center" grow pb="xl" px="md">
            <Button onClick={openCart} disabled={cart.totalItems === 0}>
              <IconShoppingCart />
              Cart{" "}
              {cart.totalItems ? (
                <Badge ml={"xs"} variant="white" color="blue" circle>
                  {cart.totalItems}
                </Badge>
              ) : null}
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default NavBar;
