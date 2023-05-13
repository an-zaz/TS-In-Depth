/* eslint-disable no-redeclare,no-underscore-dangle */
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

export { ReferenceItem }