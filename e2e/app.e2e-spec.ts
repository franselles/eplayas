import { EplayasPage } from './app.po';

describe('eplayas App', () => {
  let page: EplayasPage;

  beforeEach(() => {
    page = new EplayasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
