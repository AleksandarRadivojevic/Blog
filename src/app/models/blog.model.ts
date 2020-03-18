export class Blog {
    constructor(title: string, text: string, categoryId: number) {
        this.title = title;
        this.text = text;
        this.categoryId = categoryId;
    }

    id?: number;
    createdAt?: string;
    updatedAt?: string;
    title: string;
    text: string;
    categoryId: number;
}
