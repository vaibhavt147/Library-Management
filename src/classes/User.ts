import { Book } from "./Book";
import { BorrowRecord } from "./BorrowRecord";

export class User {
  private static nextId = 1;

  public readonly id: number;
  public name: string;
  private borrowedBooks: Map<number, BorrowRecord>;

  constructor(name: string) {
    this.id = User.nextId++;
    this.name = name;
    this.borrowedBooks = new Map();
  }

  borrowBook(book: Book, record: BorrowRecord): void {
    this.borrowedBooks.set(book.id, record);
  }

  returnBook(bookId: number): void {
    this.borrowedBooks.delete(bookId);
  }

  getBorrowedBooks(): BorrowRecord[] {
    return Array.from(this.borrowedBooks.values());
  }
}
