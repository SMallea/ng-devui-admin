import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardListComponent } from './card-list.component';
import { ListDataService } from '../../../@core/mock/list-data.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let listDataServiceMock: jest.Mocked<ListDataService>;
    
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });
  
  beforeEach(async () => {
    listDataServiceMock = {
      getCardSource: jest.fn(),
    } as unknown as jest.Mocked<ListDataService>;

    await TestBed.configureTestingModule({
      declarations: [CardListComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: ListDataService, useValue: listDataServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
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

  it('should update cardList on successful API call', () => {
    const expectedResponse = {
      total: 3,
      pageList: [
        { id: 1, name: 'Card 1' },
        { id: 2, name: 'Card 2' },
        { id: 3, name: 'Card 3' },
      ],
    };
    listDataServiceMock.getCardSource.mockReturnValue(of(expectedResponse));
    
    component.getList();
    
    expect(component.cardList).toEqual(expectedResponse.pageList);
  });

  it('should filter cardList based on keyword on successful API call', () => {
    const expectedResponse = {
      total: 3,
      pageList: [
        { id: 1, name: 'Card 1' },
        { id: 2, name: 'Card 2' },
        { id: 3, name: 'Card 3' },
      ],
    };

    listDataServiceMock.getCardSource.mockReturnValue(of(expectedResponse));

    component.keyword = 'card 2';
    component.getList();

    expect(component.cardList).toEqual([{ id: 2, name: 'Card 2' }]);
  });

  it('should update pager.pageIndex on onPageChange', () => {
    const expectedPageIndex = 2;
    component.onPageChange(expectedPageIndex);
    expect(component.pager.pageIndex).toEqual(expectedPageIndex);
  });

  it('should update pager.pageSize on onSizeChange', () => {
    const expectedPageSize = 24;
    component.onSizeChange(expectedPageSize);
    expect(component.pager.pageSize).toEqual(expectedPageSize);
  });
});