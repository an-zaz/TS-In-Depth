/* eslint-disable no-redeclare,no-underscore-dangle */
import * as  Interfaces from './interfaces';

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

class UniversityLibrarian implements Interfaces.Librarian {
    department: string;
    email: string;
    name: string;
    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }
}

export { ReferenceItem, UniversityLibrarian };