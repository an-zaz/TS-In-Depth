/* eslint-disable no-redeclare,no-underscore-dangle */

showHello('greeting', 'TypeScript');

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

type BookProperties = keyof Book;

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    // markDamaged?(reason: string): void;
    markDamaged?: DamageLogger;
}

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author  extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}
function getAllBooks(): readonly Book[] {
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

function logFirstAvailable( books: readonly Book[] = getAllBooks()): void {
    console.log(`Num of books: ${books.length}`);

    const title: string | undefined = books.find(({available}) => available)?.title;
    console.log(`1st available book: ${title}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string>{
    const books = getAllBooks();

    const titles: string[] = books.filter((book) => book.category === category)
        .map(({title}) => title);

    return titles;
}

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(title));
}

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    // to avoid destructuring on undefined
    const {title, author} = books[index] ?? {};

    return [title, author];
}

function calcTotalPages(): void {
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

function createCustomerID(name: string, id: number) {
    return `${name} - ${id}`;
}

// city will stay optional as it goes after optional argument
function createCustomer(name: string, age?: number, city: string = 'Kiev') {
    console.log(`Customer ${name}`);

    if (age) {
        console.log(`Customer ${age}`);
    }

    if (city) {
        console.log(`Customer ${city}`);
    }
}

function getBookByID(id: Book['id']): Book | undefined{
    const books = getAllBooks();

    return books.find(book => book.id === id);
}

function сheckoutBooks(customer: string, ...bookIds: number[]): string[]{
    console.log(`Customer: ${customer}`);

    return bookIds
        .map( id => getBookByID(id))
        .filter( book => book.available)
        .map(({title}) => title);
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [string | boolean] | [number, boolean] ): string[] {
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

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

function bookTitleTransform(title: any) {
    assertStringValue(title);

    return [...title].reverse().join('');
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];

    return typeof value === 'function' ? value.name : value;
}

abstract class ReferenceItem {
    // title: string;
    // year: number;
    //
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    #id: number;
    private _publisher: string;
    static department: string = 'Department A';

    // same as
    constructor(public title: string, protected year: number, id: number) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    printItem(): void{
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
        // same as
        // console.log(Object.getPrototypeOf(this).constructor.department);
    }

    get publisher(): string{
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    // we use public method to return private value
    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
    // we don't add access modifiers as they will be in parent class
    constructor( title: string,  year: number, id: number, public edition: number) {
        console.log('Creating a new Encyclopedia...');
        super(title, year, id);
    }

    override printItem(){
        super.printItem();
        console.log(`Edition: ${this.edition} ${this.year}`);
    }

    printCitation() {
        return `${this.title} - ${this.year}`;
    }
}

class UniversityLibrarian implements Librarian {
    department: string;
    email: string;
    name: string;
    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }
}

// Task 02.01, 02.02
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(0));
console.log(getBookAuthorByIndex(10));

// Task 03.01
const myId: string = createCustomerID('Ann', 10);
console.log(myId);

const a = typeof 10;  // a = 'number'

// let idGenerator: (name: string, id: number) => string;
// or
let idGenerator: typeof createCustomerID;
idGenerator = (name2: string, id: number) => `${name2} - ${id}`;
const myId2: string = idGenerator('Ann', 10);
console.log(myId2);

idGenerator = createCustomerID;
const myId3: string = idGenerator('Ann', 10);
console.log(myId3);

// Task 03.02
createCustomer('Anna');
createCustomer('Anna', 25);
createCustomer('Anna', 35, 'Budapesht');

const args: [string, number, string] = ['Kate', 25, 'Budva'];
// or
// const args: Parameters<typeof createCustomer> = ['Kate', 25, 'Budva'];
createCustomer(...args);

console.log(getBookTitlesByCategory());
logFirstAvailable();
console.log(getBookByID(10));

const myBooks = сheckoutBooks('Ann',1,2,3,4);
console.log(myBooks);

// Task 03.03
console.log(getTitles('Ann'));
console.log(getTitles(false)); // same as variable checkedOutBooks for task 3 0f 03.03
console.log(getTitles(1, true));

// Task 03.04
console.log(bookTitleTransform('aaa'));
console.log(bookTitleTransform(4));

// Task 04.01
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // when we explicitly add interface to object literal it must have the same props. (no less, no more)
    // year: 2015,
    // copies: 3
    pages: 200,
    markDamaged(reason){
        console.log(`Damaged: ${reason}`);
    }
};

// if myBook didn't have value described in Book interface - mistake
// if myBook has excess props - no mistake
printBook(myBook);
myBook.markDamaged('missing back cover');

// Task 04.02
const logDamage: DamageLogger = (reason) => {
    console.log(`Damaged: ${reason}`);
};
logDamage('missing back cover');

// Task 04.03
const favoriteAuthor: Author = {
    name: 'Anna',
    email: 'a@mail.com',
    numBooksPublished: 3,
};

// const favoriteLibrarian: Librarian = {
//     name: 'Anna',
//     email: 'a@mail.com',
//     department: 'dep#3',
//     assistCustomer (custName: string, bookTitle: string){}
// };

// Task 04.04
const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer.magazine); // undefined
console.log(offer.magazine?.getTitle()); // undefined, without ? mistake
console.log( offer.book.getTitle?.() ); // undefined, without ? mistake
console.log(offer.book.authors?.[0]); // undefined, without ? mistake
console.log(offer.book.authors?.[0]?.name); // undefined, without ? mistake

// Task 04.05
console.log(getProperty(myBook, 'title'));
console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn)');

// Task 05.01
// const ref = new ReferenceItem('Learn TS', 2023, 1);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'abc';
// console.log(ref.publisher); // should be upper-cased
// ref.getID();

// Task 05.02
const refBook  = new Encyclopedia('Learn TS', 2023, 1, 2);
console.log(refBook);
refBook.printItem();

// Task 05.03
refBook.printCitation();

// Task 05.04
const favoriteLibrarian: Librarian  = new UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris','Learn TS');