import { Blog } from './blog.model';

describe('Blog', () => {
  it('should create an instance Blog - Model', () => {
    expect(new Blog(null, null, null)).toBeTruthy();
  });
});
