"use client";

import React from "react";
import { Divider, Grid, Text, Container } from "@mantine/core";
import OrderSummary from "@/components/OrderSummary";
import OrderForm from "@/components/OrderForm";

const CheckoutPage = () => {
  return (
    <Container size="xl">
      <Text size="xl" fw={500}>
        Checkout
      </Text>
      <Divider my="sm" />
      <Text fw={500} mb="xs">
        Order Summary
      </Text>
      <Grid>
        <Grid.Col span={{ base: 12, md: 7, lg: 7 }}>
          <OrderSummary />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5, lg: 5 }}>
          <OrderForm />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
