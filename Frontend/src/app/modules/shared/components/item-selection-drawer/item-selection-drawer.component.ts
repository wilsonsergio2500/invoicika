import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ItemService} from 'src/app/services/item.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Store} from "@ngxs/store";
import {ItemActions, ItemFetchRequest, ItemState} from "@states/item";
import {Observable} from "rxjs";
import {ItemModel} from "@types";

@Component({
  selector: 'item-selection-drawer',
  templateUrl: './item-selection-drawer.component.html',
  styleUrls: ['./item-selection-drawer.component.less']
})
export class ItemSelectionDrawerComponent implements OnInit {
  @Input() visible = false;
  @Output() readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly itemSelected = new EventEmitter<any>();
  readonly items$: Observable<Array<ItemModel>> = inject(Store).select(ItemState.getItems);
  readonly empty$: Observable<boolean> = inject(Store).select(ItemState.IsEmpty);
  readonly loading$: Observable<boolean> = inject(Store).select(ItemState.IsLoading);

  listOfItems: any[] = [];
  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchText = '';

  constructor(
    private readonly store: Store,
    private itemService: ItemService,
    private message: NzMessageService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const filters = this.searchText ? [{key: 'searchTerm', value: [this.searchText]}] : [];
    const request = <ItemFetchRequest>{
      pageSize: this.pageSize,
      pageNumber: this.pageIndex,
      sortField: null,
      sortOrder: null,
      filters: filters,
      searchTerm: this.searchText
    }

    this.store.dispatch(new ItemActions.LoadItems(request));

  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadData();
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadData();
  }

  selectItem(item: any): void {
    console.log('Item selected:', item);
    this.itemSelected.emit(item);
    this.close();
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
