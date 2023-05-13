import { Book, Person } from './interfaces';

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

type BookProperties = keyof Book;
type PersonBook = Person & Book;
type BookOrUndefined = Book | undefined;

export {
    BookProperties,
    PersonBook,
    BookOrUndefined
};