import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseCategory } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('contentHandler') modalContent: TemplateRef<any>;

  private subscriptions: Subscription[] = [];

  public allCategories = [];
  public showContainerMessage = true;
  public errorHandlerMess: string;
  public categoryID: number;
  public actionMessage = 'Welcome to my blog! Here you can see all notification in application! Enjoy!';


  constructor(private commonService: CommonService,
              private apiService: ApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal
  ) { }

  ngOnInit() {
    // get categoryID from url
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      const param =  params.id;
      // tslint:disable-next-line:radix
      this.categoryID = parseInt(param.split('category')[1]);
    }));

    // get all categories and show navigation menu
    this.apiService.getAllCategories().subscribe(
      (data: ResponseCategory) => {
        if (data.success) {
          this.allCategories = data.resultData;
        } else {
          this.errorHandlerMess = data.errorMessage;
          this.openModal(this.modalContent);
        }
      },
      error => { this.errorHandlerMess = 'Please try again!'; this.openModal(this.modalContent); }
    );

    // for open error handler
    this.subscriptions.push(this.commonService.getErrorHandlerMessage().subscribe(
      mess => {
        this.errorHandlerMess = mess;
        this.openModal(this.modalContent);
      }
    ));

    // for show message action (notification)
    this.subscriptions.push(this.commonService.getActionMessage().subscribe(
      mess => {
        this.showContainerMessage = true;
        this.actionMessage = mess;
      }
    ));
  }

  // navigation menu (categories)
  navigateCategory(categoryId: number) {
    this.categoryID = categoryId;
    this.router.navigate(['/home', 'category' + categoryId]);
  }

  // signal for add new post
  addPost() {
    this.commonService.sendAddNewPost();
  }

  // for open modal (error handler)
  openModal(content) {
    this.modalService.open(content, { centered: true, size: 'md' });
  }

  // close container actions message
  closeContainerMessage() {
    this.showContainerMessage = false;
  }

  // set active class
  setClasses(catID: number) {
    if (catID === this.categoryID) {
      return 'active';
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
