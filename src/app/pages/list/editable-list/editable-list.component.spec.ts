import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { DialogService, DocumentRef } from "ng-devui";
import { ListDataService } from "../../../@core/mock/list-data.service";
import { EditableListComponent } from "./editable-list.component";
import { TranslateModule } from "@ngx-translate/core";
import { OverlayContainerRef } from "ng-devui/overlay-container";

describe('EditableListComponent', () => {
    let component: EditableListComponent;
    let fixture: ComponentFixture<EditableListComponent>;
    let listDataServiceMock: jest.Mocked<ListDataService>;
    let dialogService: DialogService;
    
    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(async () => {
        listDataServiceMock = {
            getListData: jest.fn(),
        } as unknown as jest.Mocked<ListDataService>;
    
        await TestBed.configureTestingModule({
          declarations: [EditableListComponent],
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
        fixture = TestBed.createComponent(EditableListComponent);
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

    it('onEditEnd should return rowItem[field] = false', () => {
        const rowItem = {
            field: true
        };
        
        component.onEditEnd(rowItem,'field');
        
        expect(rowItem.field).toBe(false);
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

    it('newRow should make headerNewForm true',() =>{
        component.headerNewForm = false;
        
        component.newRow();
        
        expect(component.headerNewForm).toBe(true);
    });

    it('quickRow should make headerNewForm false',() =>{
        component.headerNewForm = true;
        
        component.quickRowCancel();
        
        expect(component.headerNewForm).toBe(false);
    });
    
    it('should return a string', () => {
        const result = component.getuuid();
        
        expect(typeof result).toBe('string');
    });

    it('should return a string that starts with the current time', () => {
        const now = new Date().getTime();
        
        const result = component.getuuid();
        
        expect(result).toMatch(new RegExp(`^${now}`));
    });

    it('should return a string with "CNWO" at the end', () => {
        const result = component.getuuid();
        
        expect(result.endsWith('CNWO')).toBe(true);
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

    it('should add new data to the beginning of the listData array and hide the headerNewForm', () => {
        const initialData = [{id: '1', name: 'John'}, {id: '2', name: 'Jane'}];
        component.listData = initialData;
        component.headerNewForm = true;
        const newData = { id: '3', name: 'Bob' };

        component.quickRowAdded(newData);
        
        expect(component.listData).toEqual([...initialData]);
        expect(component.headerNewForm).toBe(false);
      });
       
});