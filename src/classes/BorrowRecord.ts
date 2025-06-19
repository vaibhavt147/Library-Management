import { Book } from "./Book";
import { User } from "./User";

export class BorrowRecord {
  private static nextId = 1;
  public readonly id: number;
  public readonly bookId: number;
  public readonly userId: number;
  public readonly borrowDate: Date;
  public readonly dueDate: Date;
  public returnDate: Date | null;

  constructor(
    book: Book,
    user: User,
    borrowDate: Date = new Date(),
    dueDays: number = 5
  ) {
    this.id = BorrowRecord.nextId++;
    this.bookId = book.id;
    this.userId = user.id;
    this.borrowDate = borrowDate;
    this.dueDate = new Date(borrowDate);
    this.dueDate.setDate(this.borrowDate.getDate() + dueDays);
    this.returnDate = null;
  }

  markReturned(returnDate: Date = new Date()): void {
    this.returnDate = returnDate;
  }

  isOverdue(currentDate: Date = new Date()): boolean {
    return !this.returnDate && currentDate > this.dueDate;
  }

  getLateDays(currentDate: Date = new Date()): number {
    if (!this.isOverdue(currentDate)) return 0;
    const lateMs = currentDate.getTime() - this.dueDate.getTime();
    return Math.ceil(lateMs / (1000 * 60 * 60 * 24));
  }
}
