import { Blog } from './blog.model';
import { Category } from './category.model';

export class ResponseCategory {
    success: boolean;
    resultData: Array<Category>;
    errorMessage: string;
}

export class ResponseBlog {
    success: boolean;
    resultData: Array<Blog>;
    errorMessage: string;
}
