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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SideSettingsComponent } from "../@shared/components/side-settings/side-settings.component";
import { PersonalizeComponent } from "../@shared/components/personalize/personalize.component";

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
      component.menu = {theme: 'light'}; // set the menu property here
    }),
    defaultCustom: {
      brand: 'default',
      isDark: false
    }
  };
  const drawerServiceMock = {
    open: jest.fn()
  };
  const dialogServiceMock = {
    open: jest.fn(),
  };
  
  

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [PagesComponent, PersonalizeComponent],
      imports: [TranslateModule.forRoot(), BrowserAnimationsModule],
      providers: [
        { provide: PersonalizeService, useValue: personalizeServiceMock },
        { provide: DrawerService, useValue: drawerServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
        DaLayoutService,
        CustomThemeService,
        OverlayContainerRef,
        DocumentRef
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

  it('should open side menu drawer', () => {
    component.openSideMenuDrawer();
    expect(drawerService.open).toHaveBeenCalledWith({
      drawerContentComponent: SideMenuComponent,
      width: '240px',
      position: 'left',
      data: { data: component.menu }
    });
  });

  it('should open setting drawer', () => {
    component.openSettingDrawer();
    expect(drawerService.open).toHaveBeenCalledWith({
      drawerContentComponent: SideSettingsComponent,
      width: '350px',
      destroyOnHide: false,
      data: { close: expect.any(Function) }
    });
  });

  it('should open personalize dialog', () => {
    component.personalizeConfig();
    expect(dialogService.open).toHaveBeenCalledWith({
      id: 'theme',
      width: '800px',
      maxHeight: '800px',
      title: '',
      content: PersonalizeComponent,
      backdropCloseable: true,
      draggable: false,
      onClose: expect.any(Function),
      buttons: []
    });
  });

  it('should update layoutConfig for sidebar shrink', () => {
    component.sidebarShrink(true);
    expect(component.layoutConfig.sidebar.shrink).toBe(true);
    expect(component.layoutConfig.sidebar.firSidebar.width).toBe(54);
    component.sidebarShrink(false);
    expect(component.layoutConfig.sidebar.shrink).toBe(false);
    expect(component.layoutConfig.sidebar.firSidebar.width).toBe(240);
  });
  
  it('should update layoutConfig for sidebar fold', () => {
    component.sidebarFold(true);
    expect(component.layoutConfig.sidebar.firSidebar.hidden).toBe(true);
    component.sidebarFold(false);
    expect(component.layoutConfig.sidebar.firSidebar.hidden).toBe(false);
  });
});