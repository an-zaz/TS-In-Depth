/* eslint-disable no-redeclare,no-underscore-dangle */
import { Book, TOptions } from './interfaces';
import { Category } from './enums';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];

    return books;
}

// object
// function logFirstAvailable(books: object[]): void {
//     console.log(`Num of books: ${books.length}`);
//
//     const title: string = (<Book>books.find((book: Book) => book.available)).title;
// }

// any
// function logFirstAvailable(books: any[]): void {
//     console.log(`Num of books: ${books.length}`);
//
//     const title: string = books.find((book) => book.available).title;
// }

// unknown - need to narrow type to determine properties
// function logFirstAvailable(books: unknown[]): void {
//     console.log(`Num of books: ${books.length}`);
//
//     const title: string = books.find((book) => book.available).title;
// }

export function logFirstAvailable( books: readonly Book[] = getAllBooks()): void {
    console.log(`Num of books: ${books.length}`);

    const title: string | undefined = books.find(({available}) => available)?.title;
    console.log(`1st available book: ${title}`);
}

export function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string>{
    const books = getAllBooks();

    const titles: string[] = books.filter((book) => book.category === category)
        .map(({title}) => title);

    return titles;
}

export function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    // to avoid destructuring on undefined
    const {title, author} = books[index] ?? {};

    return [title, author];
}

export function calcTotalPages(): void {
    const data = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ] as const;

    // bigint is not assignable to type number
    const numOfPages = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) + BigInt(obj.avgPagesPerBook);
    }, 0n);
}

export function createCustomerID(name: string, id: number) {
    return `${name} - ${id}`;
}

// city will stay optional as it goes after optional argument
export function createCustomer(name: string, age?: number, city: string = 'Kiev') {
    console.log(`Customer ${name}`);

    if (age) {
        console.log(`Customer ${age}`);
    }

    if (city) {
        console.log(`Customer ${city}`);
    }
}

export function getBookByID(id: Book['id']): BookOrUndefined{
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIds: number[]): string[]{
    console.log(`Customer: ${customer}`);

    return bookIds
        .map( id => getBookByID(id))
        .filter( book => book.available)
        .map(({title}) => title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean] ): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.available === available && book.id === id).map(book => book.title);
        }
    }
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any) {
    assertStringValue(title);

    return [...title].reverse().join('');
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);

    data.printItem();
}
export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];

    return typeof value === 'function' ? value.name : value;
}

export function setDefaultConfig(options: TOptions){
    options.duration ??= 100;
    options.speed ??= 60;

    return options;
}

export function purge<T>(inventory: Array<T>): T[] {
    return inventory.slice(2);
}
