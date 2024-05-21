import IBook from "../Book";

export interface ICartItem {
  book: IBook;
  quantity: number;
}

interface ICart {
  items: ICartItem[];
  total: number;
  totalItems: number;
}

export default ICart;
