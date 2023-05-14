import { Book, Magazine } from '../interfaces';

export default class Shelf<T>{
    items: T[] = [];

    add(item: T) {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
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