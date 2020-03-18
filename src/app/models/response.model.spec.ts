import { ResponseCategory } from './response.model';
import { ResponseBlog } from './response.model';

describe('Response', () => {
  it('should create an instance of ResponseCategory - Model', () => {
    expect(new ResponseCategory()).toBeTruthy();
  });

  it('should create an instance of ResponseBlog - Model', () => {
    expect(new ResponseBlog()).toBeTruthy();
  });
});
