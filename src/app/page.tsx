"use client";

import { Alert, Container, Flex, Pagination } from "@mantine/core";
import { useEffect } from "react";

import BookCard from "@/components/BookCard";
import Filter from "@/components/Filter";
import { useBookStore } from "@/providers/bookStoreProvider";
import CardSkeleton from "@/components/CardSkeleton";
import { IconInfoCircle } from "@tabler/icons-react";
import { Banner } from "@/components/Banner/Banner";

export default function HeaderMenu() {
  const { books, currentPage, totalPages, isFetching, fetchBooks } =
    useBookStore((state) => state);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <>
      <Banner />
      <Container size="xl">
        <Filter />
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
          pt="md"
        >
          {isFetching ? <CardSkeleton /> : null}
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              price={book.price}
              category={book.category}
              description={book.description}
            />
          ))}
          {!isFetching && books.length === 0 ? (
            <Alert
              variant="outline"
              color="yellow"
              radius="md"
              title="Sorry!"
              icon={<IconInfoCircle />}
              mt="xl"
              w="100%"
            >
              We could not find any books for your preference.
            </Alert>
          ) : null}
        </Flex>
      </Container>
      <Flex mih={80} mt={20} gap="md" justify="center" align="center">
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={fetchBooks}
          mt="sm"
        />
      </Flex>
    </>
  );
}
