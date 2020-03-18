import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://frontend-api-test-nultien.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  /* create blog */
  addNewBlog(formBlog: Blog) {
    return this.http.post(this.baseUrl + 'api/BlogPosts', formBlog);
  }

  /* read blog/categories */
  getAllCategories() {
    return this.http.get(this.baseUrl + 'api/Category');
  }
  getAllBlogs() {
    return this.http.get(this.baseUrl + 'api/BlogPosts');
  }
  getBlogsByID(categoryID: number) {
    return this.http.get(this.baseUrl + 'api/BlogPosts/GetPostByCategory?categoryId=' + categoryID);
  }

  /* update blog */
  editBlog(formBlog: Blog, blogID: number) {
    return this.http.put(this.baseUrl + 'api/BlogPosts/' + blogID, formBlog);
  }

  /* delete blog */
  deleteBlog(blogID: number) {
    return this.http.delete(this.baseUrl + 'api/BlogPosts/' + blogID);
  }
}
