"use client";
import { Box, Flex, Anchor } from "@mantine/core";

import classes from "./index.module.scss";

const Footer = () => {
  return (
    <Box mt={120} className={classes.footer} component="footer" h={50}>
      <Flex mih={80} gap="md" justify="center" align="center">
        <Anchor c="dimmed" href="/" size="sm">
          Book Store
        </Anchor>
      </Flex>
    </Box>
  );
};

export default Footer;
