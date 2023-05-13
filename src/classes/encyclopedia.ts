import { ReferenceItem } from './reference-item';

export default class Encyclopedia extends ReferenceItem {
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