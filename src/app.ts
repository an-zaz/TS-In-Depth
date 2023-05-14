/* eslint-disable no-redeclare,no-underscore-dangle */

import { ReferenceItem, UL, RefBook } from './classes';
import {
    bookTitleTransform,
    createCustomer,
    createCustomerID,
    getAllBooks,
    getBookAuthorByIndex, getBookByID,
    getBookTitlesByCategory, getProperty, getTitles,
    logBookTitles,
    logFirstAvailable, printBook, setDefaultConfig,
    сheckoutBooks,
    printRefBook
} from './functions';
import { Category } from './enums';
import { Author, Book, Librarian, Logger, TOptions } from './interfaces';
import { PersonBook } from './types';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
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
const logDamage: Logger = (reason) => {
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
const refBook  = new RefBook('Learn TS', 2023, 1, 2);
console.log(refBook);
refBook.printItem();

// Task 05.03
refBook.printCitation();

// Task 05.04
const favoriteLibrarian: Librarian  = new UL.UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris','Learn TS');

// Task 05.05
const personBook: PersonBook = {
    author: 'Anna',
    available: false,
    category: Category.Angular,
    email: 'anna@email.com',
    id: 1,
    name: 'Anna',
    title: 'Unknown'
};

let o: TOptions = {speed: 30};
o = setDefaultConfig(o);
console.log(o);

// Task 06.03
printRefBook(refBook);

const ul = new UL.UniversityLibrarian();
printRefBook(ul);

// Task 06.05
const flag = true;

if (flag) {
    import('./classes')
        .then(m => {
            const reader = new m.Reader();
            console.log(reader);
        });
}

if (flag) {
    const m = await import('./classes');
    const reader = new m.Reader();
    console.log(reader);
}