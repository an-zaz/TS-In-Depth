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

function logFirstAvailable( books: readonly Book[]): void {
    console.log(`Num of books: ${books.length}`);

    const title: string | undefined = books.find(({available}) => available)?.title;
    console.log(`1st available book: ${title}`);
}

function getBookTitlesByCategory(category: Category): Array<string>{
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

// Task 02.01, 02.02
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
console.log(getBookAuthorByIndex(0));
console.log(getBookAuthorByIndex(10));

