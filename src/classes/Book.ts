export class Book {
  private static nextId = 1;
  public readonly id: number;
  public title: string;
  public author: string;
  public genre: string;
  public isbn: string;
  public isAvailable: boolean;
  public borrowdBy: number | null;

  constructor(title: string, author: string, genre: string, isbn: string) {
    this.id = Book.nextId++;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.isbn = isbn;
    this.isAvailable = true;
    this.borrowdBy = null;
  }

  markBorrowed(userId: number): void {
    this.isAvailable = false;
    this.borrowdBy = userId;
  }

  markReturned(): void {
    this.isAvailable = true;
    this.borrowdBy = null;
  }
}
