/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular
}

type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

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

function getBookByID(id: number): Book {
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