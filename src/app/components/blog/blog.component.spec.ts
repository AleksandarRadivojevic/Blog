import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { Blog } from 'src/app/models/blog.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [BlogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on call methode ngOnChanges - call methode loadBlogs', () => {
    spyOn(component, 'loadBlogs');
    component.ngOnChanges();
    expect(component.loadBlogs).toHaveBeenCalled();
  });

  it('should be on click edit blog, prepare and open modal window', () => {
    spyOn(component, 'openModal');
    const selectedBlog: Blog = {
      id: 1,
      title: 'testTitle',
      text: 'testText',
      createdAt: '2020-03-17T21:45:15.2968499Z',
      updatedAt: '2020-03-17T21:45:15.2969322Z',
      categoryId: 1
    };

    component.editBlog(selectedBlog);
    expect(component.actionPost).toBe('edit');
    expect(component.formBlog).toEqual(selectedBlog);
    expect(component.openModal).toHaveBeenCalled();
  });

  it('should be on post blog check validation', () => {
    spyOn(component, 'validation');
    component.postBlog();
    expect(component.submitted).toBe(true);
    expect(component.validation).toHaveBeenCalled();
  });
});
