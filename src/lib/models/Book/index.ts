// Book Interface
export default interface IBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  category: string;
  description?: string;
}

export interface IBookApiResponse {
  books: IBook[];
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  isFetching: boolean;
}
