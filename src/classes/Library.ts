import { Book } from "./Book";
import { BorrowRecord } from "./BorrowRecord";
import { User } from "./User";

export class Library {
  private static instance: Library;
  private books: Map<number, Book>;
  private users: Map<number, User>;
  private borrowRecords: Map<number, BorrowRecord>;

  public static getInstance() {
    if (!Library.instance) {
      Library.instance = new Library();
    }
    return Library.instance;
  }

  private constructor() {
    this.books = new Map();
    this.users = new Map();
    this.borrowRecords = new Map();
  }

  addBook(book: Book): void {
    this.books.set(book.id, book);
  }

  registerUser(user: User): void {
    this.users.set(user.id, user);
  }

  borrowBook(userId: number, bookId: number): boolean {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user || !book) {
      console.log("User or Book not found.");
      return false;
    }

    if (!book.isAvailable) {
      console.log("Book is currently unavailable.");
      return false;
    }

    const record = new BorrowRecord(book, user);
    book.markBorrowed(user.id);
    user.borrowBook(book, record);
    this.borrowRecords.set(record.id, record);

    const successMessage = `${user.name} borrowed "${book.title}" (Record ID: ${record.id})`;
    console.log(successMessage);
    return true;
  }

  returnBook(userId: number, bookId: number): boolean {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user || !book) {
      console.log("User or Book not found.");
      return false;
    }

    const record = user
      .getBorrowedBooks()
      .find((record) => record.id === bookId);

    if (!record) {
      console.log("Book not borrowed by user.");
      return false;
    }
    record.markReturned();
    user.returnBook(bookId);
    book.markReturned();

    console.log(`${user.name} returned "${book.title}".`);
    return true;
  }

  getAllBooks(): Book[] {
    return Array.from(this.books.values());
  }

  getBorrowRecordById(recordId: number): BorrowRecord | undefined {
    return this.borrowRecords.get(recordId);
  }

  getAllBorrowRecords(): BorrowRecord[] {
    return Array.from(this.borrowRecords.values());
  }

  searchBooks(
    query: Partial<{
      title: string;
      author: string;
      genre: string;
      isbn: string;
    }>
  ): Book[] {
    const normalized = {
      title: query.title?.toLowerCase(),
      author: query.author?.toLowerCase(),
      genre: query.genre?.toLowerCase(),
      isbn: query.isbn,
    };
    return Array.from(this.books.values()).filter((book) => {
      const matchesTitle =
        !normalized.title ||
        book.title.toLowerCase().includes(normalized.title);
      const matchesAuthor =
        !normalized.author ||
        book.author.toLowerCase().includes(normalized.author);
      const matchesGenre =
        !normalized.genre ||
        book.genre.toLowerCase().includes(normalized.genre);
      const matchesIsbn = !normalized.isbn || book.isbn === normalized.isbn;

      return matchesTitle && matchesAuthor && matchesGenre && matchesIsbn;
    });
  }
}
