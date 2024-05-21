"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type BookStore, createBookStore } from "@/store";

export const BookStoreContext = createContext<StoreApi<BookStore> | null>(null);

export interface BookStoreProviderProps {
  children: ReactNode;
}

export const BookStoreProvider = ({ children }: BookStoreProviderProps) => {
  const storeRef = useRef<StoreApi<BookStore>>();
  if (!storeRef.current) {
    storeRef.current = createBookStore();
  }

  return (
    <BookStoreContext.Provider value={storeRef.current}>
      {children}
    </BookStoreContext.Provider>
  );
};

export const useBookStore = <T,>(selector: (store: BookStore) => T): T => {
  const bookStoreContext = useContext(BookStoreContext);

  if (!bookStoreContext) {
    throw new Error(`useBookStore must be use within BookStoreProvider`);
  }

  return useStore(bookStoreContext, selector);
};
