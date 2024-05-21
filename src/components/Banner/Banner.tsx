import { Title, Text, Button, Container } from "@mantine/core";

import classes from "./index.module.scss";
import { Dots } from "./Dots";

export function Banner() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Discover Your
          <Text
            ml="xs"
            mr="xs"
            component="span"
            className={classes.highlight}
            inherit
          >
            Next
          </Text>
          Great Read
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Shop new releases, bestsellers, and beloved classics online or
            in-store. Connect with fellow book lovers and find your community.
          </Text>
        </Container>
      </div>
    </Container>
  );
}
