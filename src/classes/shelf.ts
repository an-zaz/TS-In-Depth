import {Book, Magazine, ShelfItem} from '../interfaces';

export default class Shelf<T extends ShelfItem>{
    items: T[] = [];

    add(item: T) {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    // title doesn't exist on T without T extends ShelfItem as T could be primitive
    find(title: string): T {
        return this.items.find(item => item.title === title);
    }

    printTitles() {
        this.items.forEach(item => console.log(item.title));
    }
}

// otherwise very difficult to create, not valid:
// export  class Shelf{
//     items: Book[] | Magazine[] = [];
//
//     add(item: Book & Magazine) {
//         this.items.push(item);
//     }
// }