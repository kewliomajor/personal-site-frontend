import { PersonalFrontendPage } from './app.po';

describe('personal-frontend App', () => {
  let page: PersonalFrontendPage;

  beforeEach(() => {
    page = new PersonalFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
