import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBarComponent } from './menu-bar.component';
import { CommonService } from 'src/app/services/common.service';


describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;
  let commonService: CommonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBarComponent],
      providers: [CommonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    // tslint:disable-next-line: deprecation
    commonService = TestBed.get(CommonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on input search, send value to filtering', () => {
    spyOn(commonService, 'sendSearchBlogValue');
    component.search('test');
    expect(commonService.sendSearchBlogValue).toHaveBeenCalled();
  });
});
