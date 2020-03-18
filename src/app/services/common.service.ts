import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private addNewPost = new Subject<any>();
  private errorHandlerMessage = new Subject<any>();
  private actionMessage = new Subject<any>();
  private searchBlogValue = new Subject<any>();

  constructor() { }

  /* comunication between components */
  // signal for add new post
  sendAddNewPost() {
    this.addNewPost.next();
  }
  getAddNewPost(): Observable<null> {
    return this.addNewPost.asObservable();
  }

  // signal for open modal error handler
  sendErrorHandlerMessage(value: string) {
    this.errorHandlerMessage.next(value);
  }
  getErrorHandlerMessage(): Observable<null> {
    return this.errorHandlerMessage.asObservable();
  }

  // signal for open and show message actions
  sendActionMessage(value: string) {
    this.actionMessage.next(value);
  }
  getActionMessage(): Observable<null> {
    return this.actionMessage.asObservable();
  }

  // signal for search blog
  sendSearchBlogValue(value: string) {
    this.searchBlogValue.next(value);
  }
  getSearchBlogValue(): Observable<null> {
    return this.searchBlogValue.asObservable();
  }
}
