// @flow

// Переписать на proxy

class SizedStack {
    holder: Array<any>;
    size: number;

    constructor(size: number) {
        this.holder = [];
        this.size = size;
    }

    push(val: any): void {
        this.holder.unshift(val);
        this.holder.length = this.size;
    }

    get(index:number): any {
        return this.holder[index];
    }

    toString() {
        return this.holder.toString();
    }
}

export default SizedStack;
