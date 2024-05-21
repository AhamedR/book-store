import { IBookApiResponse } from "@/lib/models/Book";
import books from "../../books.json";

export type SortOrder = "all" | "low" | "high";

const getBooks = (
  page: number,
  search?: string,
  sort?: "all" | "low" | "high",
  limit: number = 10,
): IBookApiResponse => {
  if (page < 1) {
    throw new Error(
      "Invalid page number. Page must be greater than or equal to 1.",
    );
  }

  let filteredBooks = books;

  // Search filtering
  if (search) {
    const searchTerm = search.toLowerCase();

    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm),
    );
  }

  console.log(filteredBooks);

  // Sorting
  if (sort === "low") {
    filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredBooks.sort((a, b) => b.price - a.price);
  }

  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Calculate start and end indices for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalItems);

  // Get the paginated subset of books
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return {
    books: paginatedBooks,
    currentPage: page,
    totalItems,
    itemsPerPage: limit,
    totalPages,
  };
};

export { getBooks };
