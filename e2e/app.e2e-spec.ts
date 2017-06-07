import { Kawachat2Page } from './app.po';

describe('kawachat2 App', () => {
  let page: Kawachat2Page;

  beforeEach(() => {
    page = new Kawachat2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
