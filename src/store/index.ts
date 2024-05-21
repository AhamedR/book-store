import IBook, { IBookApiResponse } from "@/lib/models/Book";
import { createStore } from "zustand";

import { getBooks } from "@/api";
import ICart, { ICartItem } from "@/lib/models/Cart";
import IOrderDetails from "@/lib/models/Order";

export type Actions = {
  fetchBooks: (page?: number) => void;
  searchBooks: (searchTerm: string) => void;
  filterBooks: (sortBy: "all" | "low" | "high", searchTerm?: string) => void;
  toggleCardDrawer: () => void;
  updateCartItemQuantity: (bookId: string, change: number) => void;
};

export type Cart = {
  isCartOpen: boolean;
  cart: ICart;
  addToCart: (book: IBook) => void;
  placeOrder: (orderDetails: IOrderDetails) => void;
};

export type BookStore = IBookApiResponse & Actions & Cart;

export const defaultInitState: IBookApiResponse = {
  books: [],
  currentPage: 1,
  totalItems: 1,
  itemsPerPage: 1,
  totalPages: 1,
};

export const createBookStore = (
  initState: IBookApiResponse = defaultInitState,
) => {
  return createStore<BookStore>()((set, get) => ({
    ...initState,
    isCartOpen: false,
    cart: { items: [], total: 0, totalItems: 0 },
    fetchBooks: (page = 1) => {
      const { books, currentPage, totalItems, itemsPerPage, totalPages } =
        getBooks(page);

      set({
        books,
        currentPage,
        totalItems,
        itemsPerPage,
        totalPages,
      });
    },
    searchBooks: (searchTerm: string) => {
      const { books, currentPage, totalItems, itemsPerPage, totalPages } =
        getBooks(1, searchTerm);

      set({
        books,
        currentPage,
        totalItems,
        itemsPerPage,
        totalPages,
      });
    },
    filterBooks: (sortBy, searchTerm?: string) => {
      const { books, currentPage, totalItems, itemsPerPage, totalPages } =
        getBooks(1, searchTerm, sortBy);

      set({
        books,
        currentPage,
        totalItems,
        itemsPerPage,
        totalPages,
      });
    },
    addToCart: (book: IBook) => {
      set((state) => {
        const existingItem = state.cart.items.find(
          (item) => item.book.id === book.id,
        );

        if (existingItem) {
          // Update quantity of existing item
          const updatedItems = state.cart.items.map((item) =>
            item.book.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );

          // Recalculate total and totalItems
          const newTotal = updatedItems.reduce(
            (acc, item) => acc + item.book.price * item.quantity,
            0,
          );
          const newTotalItems = updatedItems.reduce(
            (acc, item) => acc + item.quantity,
            0,
          );

          return {
            ...state,
            cart: {
              items: updatedItems,
              total: newTotal,
              totalItems: newTotalItems,
            },
          };
        } else {
          // Add new item
          return {
            ...state,
            cart: {
              items: [...state.cart.items, { book, quantity: 1 }],
              total: state.cart.total + book.price,
              totalItems: state.cart.totalItems + 1,
            },
          };
        }
      });
    },
    placeOrder: (orderDetails: IOrderDetails) => {
      // 1. Process Order (send to backend, etc.)
      console.log("Placing order:", orderDetails, get().cart);

      // 2. Clear Cart
      set({
        cart: { items: [], total: 0, totalItems: 0 },
      });
    },
    updateCartItemQuantity: (
      bookId: string,
      change: number, // +1 to increase, -1 to decrease
    ) => {
      set((state) => {
        const updatedItems = state.cart.items
          .map((item) => {
            if (item.book.id === bookId) {
              const newQuantity = item.quantity + change;
              return newQuantity > 0
                ? { ...item, quantity: newQuantity }
                : null;
            }
            return item;
          })
          .filter(Boolean) as ICartItem[];

        // Recalculate total and totalItems
        const newTotal = updatedItems.reduce(
          (acc, item) => acc + item.book.price * item.quantity,
          0,
        );
        const newTotalItems = updatedItems.reduce(
          (acc, item) => acc + item.quantity,
          0,
        );

        return {
          ...state,
          cart: {
            items: updatedItems,
            total: newTotal,
            totalItems: newTotalItems,
          },
        };
      });
    },
    toggleCardDrawer: () => {
      set((state) => {
        return {
          isCartOpen: !state.isCartOpen,
        };
      });
    },
  }));
};
