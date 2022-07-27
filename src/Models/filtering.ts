
export class Filtering {
    private category: string;
    private fields: string[];
    constructor(category: string, fields: string[]) {
        this.category = category;
        this.fields = fields;
    }
    public getCategory(): string {
        return this.category;
    }
    public getFields(): string[] {
        return this.fields;
    }
}

