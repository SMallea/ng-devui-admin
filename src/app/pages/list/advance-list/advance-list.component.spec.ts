import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ListDataService } from "../../../@core/mock/list-data.service";
import { AdvanceListComponent } from "./advance-list.component";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { TranslateModule } from "@ngx-translate/core";
import { DialogService, DocumentRef } from "ng-devui";
import { OverlayContainerRef } from "ng-devui/overlay-container";

describe('AdvanceListComponent', () => {
    let component: AdvanceListComponent;
    let fixture: ComponentFixture<AdvanceListComponent>;
    let listDataServiceMock: jest.Mocked<ListDataService>;
    let dialogService: DialogService;
    
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(async () => {
        listDataServiceMock = {
            getOriginSource: jest.fn(),
        } as unknown as jest.Mocked<ListDataService>;
    
        await TestBed.configureTestingModule({
          declarations: [AdvanceListComponent],
          imports: [TranslateModule.forRoot()],
          providers: [
            { provide: ListDataService, useValue: listDataServiceMock },
            DialogService,
            OverlayContainerRef,
            DocumentRef
        ],
        }).compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(AdvanceListComponent);
        component = fixture.componentInstance;
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
    
    it('should call getList() on search()', () => {
        const getListSpy = jest.spyOn(component, 'getList');
        component.search();
        expect(getListSpy).toHaveBeenCalled();
    });

    it('should reset searchform and call getList() on reset()', () => {
        const getListSpy = jest.spyOn(component, 'getList');
        component.searchForm = {
            keyword: '3',
            gender: 'test'
        };

        component.reset();
        expect(component.searchForm).toEqual({ keyword:'', gender: 'all'})
        expect(getListSpy).toHaveBeenCalled();
    });

    it('beforeEditStart should return true', () => {
        const res = component.beforeEditStart(1,1)
        expect(res).toBe(true);
    });

    it('beforeEditEnd should return true when rowItem and field are more or equal than 3', () => {
        const test = {
            wrongName: 'Jo',
            acceptableName: 'John',
        };
        const res = component.beforeEditEnd(test,'acceptableName')
        expect(res).toBe(true);
    });

    it('beforeEditEnd should return false when rowItem and field are less than 3', () => {
        const test = {
            wrongName: 'Jo',
            acceptableName: 'John',
        };
        const res = component.beforeEditEnd(test,'wrongName')
        expect(res).toBe(false);
    });

    it('onEditEnd should return rowItem[field] = false', () => {
        const rowItem = {
            field: true
        };
        component.onEditEnd(rowItem,'field');
        expect(rowItem.field).toBe(false);
    });

    it('should filter data based on the first filter change', () => {
        const column = { field: 'name' };
        const filters = [
          { name: 'John' , value: 10},
          { name: 'Doe' , value: 20},
        ];
        const data = [
          { id: 1, name: 'John' , value: 10},
          { id: 2, name: 'Doe', value: 20 },
          { id: 3, name: 'Smith', value: 30 },
        ];
        component.originData = data;
        component.onFirstFilterChange(filters, column);
        expect(component.basicDataSource).toEqual([
          { id: 1, name: 'John' , value: 10},
          { id: 2, name: 'Doe' , value: 20},
        ]);
      });
})  