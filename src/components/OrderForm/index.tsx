"use client";

import { useRouter } from "next/navigation";
import { Button, Container, Fieldset, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useBookStore } from "@/providers/bookStoreProvider";

const orderSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  zipPostalCode: z.string().min(1, "Zip/Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const OrderForm = () => {
  const { placeOrder } = useBookStore((state) => state);
  const router = useRouter();

  const form = useForm<OrderFormValues>({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      country: "",
    },
    validate: zodResolver(orderSchema),
  });

  const handleSubmit = form.onSubmit((values) => {
    placeOrder(values);

    // Mocking the placing order
    const id = notifications.show({
      loading: true,
      title: "Preparing your order",
      message: "We are just preparing your order",
      autoClose: false,
      withCloseButton: false,
      position: "bottom-center",
    });

    setTimeout(() => {
      notifications.update({
        id,
        color: "teal",
        title: "Order Placed",
        message: "Your order has been placed successfully",
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
      });
    }, 3000);

    router.push("/");
  });

  return (
    <form onSubmit={handleSubmit}>
      <Container size="sm">
        <Fieldset legend="Delivery Information">
          <TextInput
            label="Full Name"
            {...form.getInputProps("fullName")}
            error={form.errors.fullName}
          />
          <TextInput
            mt="md"
            label="Address"
            {...form.getInputProps("address")}
            error={form.errors.address}
          />
          <TextInput
            mt="md"
            label="City"
            {...form.getInputProps("city")}
            error={form.errors.city}
          />
          <TextInput
            mt="md"
            label="State/Province"
            {...form.getInputProps("stateProvince")}
            error={form.errors.stateProvince}
          />
          <TextInput
            mt="md"
            label="Zip/Postal Code"
            {...form.getInputProps("zipPostalCode")}
            error={form.errors.zipPostalCode}
          />
          <TextInput
            mt="md"
            label="Country"
            {...form.getInputProps("country")}
            error={form.errors.country}
          />
        </Fieldset>
        <Button type="submit" loading={false} mt={"lg"}>
          Place Order
        </Button>
      </Container>
    </form>
  );
};

export default OrderForm;
