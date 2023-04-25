import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule } from "@ngx-translate/core";
import { DialogService, DocumentRef } from "ng-devui";
import { OverlayContainerRef } from "ng-devui/overlay-container";
import { ListDataService } from "../../../@core/mock/list-data.service";
import { TreeListComponent } from "./tree-list.component";

describe('TreeListComponent', () => {
    let component: TreeListComponent;
    let fixture: ComponentFixture<TreeListComponent>;
    let listDataService: ListDataService;
    let dialogService: DialogService;

    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    });

    beforeEach(async () => {
        const listDataServiceMock = {
            getTreeSource: jest.fn(),
        } as unknown as jest.Mocked<ListDataService>;

        await TestBed.configureTestingModule({
            declarations: [TreeListComponent],
            imports: [TranslateModule.forRoot(), BrowserAnimationsModule],
            providers: [
                { provide: ListDataService, useValue: listDataServiceMock },
                DialogService,
                OverlayContainerRef,
                DocumentRef
            ]
        }).compileComponents();
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeListComponent);
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

    it('should call getList() on search()', () => {
        const getListSpy = jest.spyOn(component, 'getList');
        component.search();
        expect(getListSpy).toHaveBeenCalled();
    });
    
    it('should call getList() on onSearch()', () => {
        const getListSpy = jest.spyOn(component, 'getList');
        component.onSearch();
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
    
})