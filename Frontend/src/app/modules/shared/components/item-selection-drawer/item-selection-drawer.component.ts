import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'item-selection-drawer',
  templateUrl: './item-selection-drawer.component.html',
  styleUrls: ['./item-selection-drawer.component.less']
})
export class ItemSelectionDrawerComponent implements OnInit {
  @Input() visible = false;
  @Output() readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly itemSelected = new EventEmitter<any>();

  listOfItems: any[] = [];
  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;
  searchText = '';

  constructor(
    private itemService: ItemService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    const filters = this.searchText ? [{ key: 'searchTerm', value: [this.searchText] }] : [];
    this.itemService.getItems(this.pageIndex, this.pageSize, null, null, filters, this.searchText).subscribe(
      response => {
        this.loading = false;
        this.total = response.totalCount;
        this.listOfItems = response.items;
      },
      error => {
        this.loading = false;
        this.message.error('Error loading items');
      }
    );
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
    this.itemSelected.emit(item);
    this.close();
  }

  close(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
