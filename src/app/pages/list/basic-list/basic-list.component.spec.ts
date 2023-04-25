import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasicListComponent } from './basic-list.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ListDataService } from '../../../@core/mock/list-data.service';
import { DialogService } from 'ng-devui';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { DocumentRef } from 'ng-devui/window-ref';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('BasicListComponent', () => {
    let component: BasicListComponent;
    let fixture: ComponentFixture<BasicListComponent>;
    let listDataService: ListDataService;
    let dialogService: DialogService;

    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(async () => {
        const listDataServiceMock = {
            getListData: jest.fn(),
          } as unknown as jest.Mocked<ListDataService>;
        
        await TestBed.configureTestingModule({
            declarations: [BasicListComponent],
            imports: [TranslateModule.forRoot(),BrowserAnimationsModule],
            providers: [
                { provide: ListDataService, useValue: listDataServiceMock },
                DialogService,
                OverlayContainerRef,
                DocumentRef
            ]
        }).compileComponents();
    })
    
    beforeEach(() => {
        fixture = TestBed.createComponent(BasicListComponent);
        component = fixture.componentInstance;
        listDataService = TestBed.inject(ListDataService);
        dialogService = TestBed.inject(DialogService);
        fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getList() on ngOnInit', () => {
    const getListSpy = jest.spyOn(component, 'getList');
    component.ngOnInit();
    expect(getListSpy).toHaveBeenCalled();
  });

  it('should call getList method when the pager changes', () => {
    const getListSpy = jest.spyOn(component, 'getList');
    component.onPageChange(2);
    expect(getListSpy).toHaveBeenCalled();
  });

  it('should call getList method when the page size changes', () => {
    const getListSpy = jest.spyOn(component, 'getList');
    component.onSizeChange(20);
    expect(getListSpy).toHaveBeenCalled();
  });

  it('should delete a row when deleteRow method is called', async () => {
    const index = 0;
    const spy = jest.spyOn(dialogService, 'open').mockReturnValue({
        modalInstance: {
          hide: jest.fn(() => {
            component.basicDataSource.splice(index, 1);
          })
        },
        modalContentInstance: {},
      } as never);
      
    await component.deleteRow(index);
  
    expect(spy).toHaveBeenCalled();
  });
  
})