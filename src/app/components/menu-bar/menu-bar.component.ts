import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  public searchValue: string;
  public isMenuCollapsed = true;

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  // send signal for value of search
  search(value: string) {
    this.commonService.sendSearchBlogValue(value);
  }
}
