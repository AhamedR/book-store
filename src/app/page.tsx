import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button component={Link} href="/hello">
        Next link button
      </Button>
    </main>
  );
}
