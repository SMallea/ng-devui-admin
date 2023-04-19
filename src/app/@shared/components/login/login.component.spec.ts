import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslationChangeEvent, TranslateModule, TranslateService } from "@ngx-translate/core";
import { I18nService } from "ng-devui/i18n";
import { of, throwError } from "rxjs";
import { AuthService } from "../../../@core/services/auth.service";
import { PersonalizeService } from "../../../@core/services/personalize.service";
import { LoginComponent } from "./login.component";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;
  let i18n: I18nService;
  let translateService: TranslateService;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async() => {
    router = {
      navigate: jest.fn(),
    } as any;

    authService = {
      login: jest.fn((user, password) => {
        if (user === 'wrong-user' && password === 'random-password') {
          return throwError('Invalid email');
        }
        return of({});
      }),
      setSession: jest.fn(),
    } as any;

    i18n = {
      toggleLang: jest.fn(),
      currentLang: 'en',
      onLangChange: of({ lang: 'en' } as TranslationChangeEvent),
      getLocale: jest.fn(() => of({})),
      setLocale: jest.fn(),
    } as any;
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: router },
        { provide: AuthService, useValue: authService },
        { provide: I18nService, useValue: i18n },
        { provide: PersonalizeService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the language and update translation', () => {
    // Arrange
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn()
    };
    const language = 'English';
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    // Act
    component.onLanguageClick(language);
  
      // Assert
    expect(component.language).toEqual(language);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('lang',language);
    expect(translateService.currentLang).toEqual(language);
    expect(i18n.toggleLang).toHaveBeenCalledWith(language);
  });

  it('should login with user account and navigate to home', () => {
    //Arrange
    authService.login(component.formData.userAccount,component.formData.userAccountPassword);
    
    //Act
    component.onClick('tab1');
    
    //Assert
    expect(authService.login).toHaveBeenCalledWith(component.formData.userAccount, component.formData.userAccountPassword);
    expect(authService.setSession).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should show error message with invalid email', () => {
    //Arrange
    const errorMessage = new Error ('Invalid email')
    component.i18nValues = {
      noticeMessage: {
        summary: 'Summary',
        accountContent: 'Account error',
        emailContent: 'Email error',
      },
    } ;

    component.toastMessage = [];
    authService.login('wrong-user', 'random-password');
    jest.spyOn(authService, 'login').mockReturnValueOnce(throwError(() => errorMessage));
  
    //Act
    component.onClick('tab2');

    //Assert
    expect(authService.login).toHaveBeenCalledWith('wrong-user', 'random-password');
    expect(component.toastMessage).toEqual([
      {
        severity: 'error',
        summary: 'Summary',
        content: 'Email error',
      },
    ]);
  });
});