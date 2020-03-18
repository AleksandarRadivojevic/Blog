import { Component, OnInit, Input, ViewChild, TemplateRef, OnChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { Blog } from 'src/app/models/blog.model';
import { ResponseBlog } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('content') modalContent: TemplateRef<any>;

  private subscriptions: Subscription[] = [];

  @Input() dataCategoryID: number;

  public data: Array<Blog>;
  public dataForView: Array<Blog>;
  public formBlog: Blog;
  public actionPost: string;
  public submitted = false;
  public showSpinner = false;
  public disabledPostButton = '';


  constructor(private modalService: NgbModal, private apiService: ApiService, private commonService: CommonService) { }

  ngOnInit() {
    this.showSpinner = true;
    // signal for add new post
    this.subscriptions.push(this.commonService.getAddNewPost().subscribe(
      signal => {
        this.actionPost = 'add';
        this.formBlog = new Blog(null, null, null);
        this.openModal(this.modalContent);
      }
    ));

    // search blog
    this.subscriptions.push(this.commonService.getSearchBlogValue().subscribe(
      (value: string) => {
        this.dataForView = this.data.filter(e => e.title.toLowerCase().includes(value.toLowerCase()));
      }
    ));
  }

  ngOnChanges() {
    this.loadBlogs(this.dataCategoryID);
  }

  // edit blog
  editBlog(selectedBlog: Blog) {
    this.actionPost = 'edit';
    this.formBlog = selectedBlog;
    this.openModal(this.modalContent);
  }

  // post new blog or edit blog
  postBlog() {
    this.submitted = true;
    if (this.validation()) {
      this.showSpinner = true;
      this.disabledPostButton = 'true';
      if (this.actionPost === 'add') {
        this.addNewBlog();
      } else if (this.actionPost === 'edit') {
        this.updateBlog();
      }
      this.submitted = false;
    }
  }

  // validation if is empty field
  validation() {
    if (!this.formBlog.title || !this.formBlog.text) {
      return false;
    }
    return true;
  }

  addNewBlog() {
    const blogModel: Blog = new Blog(this.formBlog.title, this.formBlog.text, this.dataCategoryID);
    this.apiService.addNewBlog(blogModel).subscribe(
      data => {
        this.modalService.dismissAll();
        this.loadBlogs(this.dataCategoryID);
        this.commonService.sendActionMessage('Successfully add new post!');
      },
      error => {
        this.commonService.sendErrorHandlerMessage('Error adding a new blog. Please try again!');
        this.loadBlogs(this.dataCategoryID);
      }
    );
  }

  updateBlog() {
    this.apiService.editBlog(this.formBlog, this.formBlog.id).subscribe(
      data => {
        this.modalService.dismissAll();
        this.loadBlogs(this.formBlog.categoryId);
        this.commonService.sendActionMessage('Successfully edited post!');
      },
      error => {
        this.commonService.sendErrorHandlerMessage('Error editing existing blog. Please try again!');
        this.loadBlogs(this.dataCategoryID);
      }
    );
  }

  deleteBlog(blog: Blog) {
    this.showSpinner = true;
    this.apiService.deleteBlog(blog.id).subscribe(
      data => {
        this.loadBlogs(blog.categoryId);
        this.commonService.sendActionMessage('Successfully deleted post!');
      },
      error => {
        this.commonService.sendErrorHandlerMessage('Error deleting selected blog. Please try again!');
        this.loadBlogs(this.dataCategoryID);
      }
    );
  }

  // refresh array after changes (add,edit)
  loadBlogs(catID: number) {
    this.apiService.getBlogsByID(catID).subscribe(
      (res: ResponseBlog) => {
        if (res.success) {
          res.resultData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          this.data = res.resultData;
          this.dataForView = res.resultData;
        } else {
          this.commonService.sendErrorHandlerMessage(res.errorMessage);
        }
        this.showSpinner = false;
      },
      error => { this.commonService.sendErrorHandlerMessage('Please try again!'); this.showSpinner = false; }
    );
  }

  // for open modal
  openModal(content) {
    this.disabledPostButton = '';
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
