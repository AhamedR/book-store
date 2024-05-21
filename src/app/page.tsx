"use client";

import { Container, Flex, Pagination } from "@mantine/core";
import { useEffect } from "react";

import BookCard from "@/components/BookCard";
import Filter from "@/components/Filter";
import { useBookStore } from "@/providers/bookStoreProvider";

export default function HeaderMenu() {
  const { books, currentPage, totalPages, fetchBooks } = useBookStore(
    (state) => state,
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <Container size="xl">
        <Filter />
        <Flex
          mih={50}
          gap="md"
          justify="space-evenly"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
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
