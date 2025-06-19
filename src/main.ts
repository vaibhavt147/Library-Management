// main.ts

import { Book } from "./classes/Book";
import { Library } from "./classes/Library";
import { User } from "./classes/User";

const library = new Library();

// --- Register Users ---
const alice = new User("Alice");
const bob = new User("Bob");

library.registerUser(alice);
library.registerUser(bob);

// --- Add Books ---‚
const book1 = new Book(
  "Clean Code",
  "Uncle Bob",
  "Programming",
  "9780132350884"
);
const book2 = new Book(
  "The Pragmatic Programmer",
  "Andrew Hunt",
  "Programming",
  "9780201616224"
);
const book3 = new Book("1984", "George Orwell", "Fiction", "9780451524935");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// --- Search Examples ---
console.log("\n🔍 Search by title:");
const cleanBooks = library.searchBooks({ title: "clean" });
cleanBooks.forEach((b) => console.log(`- ${b.title} by ${b.author}`));

console.log("\n🔍 Search by genre 'Programming':");
const programmingBooks = library.searchBooks({ genre: "Programming" });
programmingBooks.forEach((b) => console.log(`- ${b.title}`));

console.log("\n🔍 Search by author 'George':");
const georgeBooks = library.searchBooks({ author: "george" });
georgeBooks.forEach((b) => console.log(`- ${b.title}`));

// --- Borrow Book ---
console.log("\n📚 Borrowing book...");
library.borrowBook(alice.id, book1.id);
library.borrowBook(bob.id, book3.id);

// --- Return Book ---
console.log("\n↩️ Returning book...");
library.returnBook(alice.id, book1.id);

// --- All Books in Library ---
console.log("\n📖 All Books:");
library.getAllBooks().forEach((book) => {
  const status = book.isAvailable ? "Available" : "Borrowed";
  console.log(`- ${book.title} (${status})`);
});

// --- Borrow Records ---
console.log("\n📑 Borrow Records:");
library.getAllBorrowRecords().forEach((record) => {
  console.log(
    `- Record #${record.id}: Book ${record.bookId}, User ${
      record.userId
    }, Returned: ${record.returnDate ? "Yes" : "No"}`
  );
});
