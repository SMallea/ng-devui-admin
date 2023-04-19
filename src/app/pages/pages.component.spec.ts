import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { PagesComponent } from "./pages.component";
import { PersonalizeService } from "../@core/services/personalize.service";
import { DaLayoutService } from "../@shared/layouts/da-layout";
import { DialogService, DocumentRef, DrawerService } from "ng-devui";
import { OverlayContainerRef } from "ng-devui/overlay-container";
import { CustomThemeService } from "../@core/services/custom-theme.service";
import { of } from "rxjs";
import { SideMenuComponent } from "../@shared/components/side-menu/side-menu.component";

describe('PageComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let translateService: TranslateService;
  let layoutService: DaLayoutService;
  let drawerService: DrawerService;
  let dialogService: DialogService;
  let personalizeService: PersonalizeService;


  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  const personalizeServiceMock = {
    getUiTheme: () => of('light'),
    initTheme: jest.fn(),
    updateMenu: jest.fn().mockImplementation(() => {
      component.menu = {theme: 'aaa'}; // set the menu property here
      console.log('updateMenu() called with menu:', component.menu);
    })
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [PagesComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: PersonalizeService, useValue: personalizeServiceMock },
        DaLayoutService,CustomThemeService,
        DrawerService,OverlayContainerRef,DocumentRef, DialogService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    drawerService = TestBed.inject(DrawerService);
    dialogService = TestBed.inject(DialogService);
    personalizeService = TestBed.inject(PersonalizeService);
    layoutService = TestBed.inject(DaLayoutService);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties', () => {
    fixture.detectChanges();
    setTimeout(() => {
      expect(component.menu).toBeDefined();
      expect(component.layoutConfig).toBeDefined();
      expect(component.isSidebarShrink).toBe(false);
      expect(component.isSidebarFold).toBe(false);
    }, 1000); // 1 second delay
  });

  // it('should open side menu drawer', () => {
  //   component.openSideMenuDrawer();
  //   expect(drawerService.open).toHaveBeenCalledWith({
  //     drawerContentComponent: SideMenuComponent,
  //     width: '240px',
  //     position: 'left',
  //     data: { data: component.menu }
  //   });
  // });
  
});