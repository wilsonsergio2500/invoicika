import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {IItemStateModel, ItemType} from './item.model';
import {ItemActions} from './item.actions';
import {ItemService} from "@services/item.service";
import {ItemsPaginatedResponse} from "@types";
import {tap} from "rxjs/operators";


@State<IItemStateModel>({
  name: 'item',
  defaults: <IItemStateModel>{
    loading: false,
    busy: false,
    current: null,
    paginatedResponse: null,
  }
})
@Injectable()
export class ItemState {

  constructor(
    private readonly itemService: ItemService,
  ) {
  }

  get basePath() {
    return 'path';
  }

  @Selector()
  static IsLoading(state: IItemStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static IsWorking(state: IItemStateModel): boolean {
    return state.busy;
  }

  @Selector()
  static getCurrent(state: IItemStateModel): ItemType | null {
    return state.current;
  }

  @Selector()
  static getPaginatedResponse(state: IItemStateModel): ItemsPaginatedResponse | null {
    return state.paginatedResponse;
  }

  @Action(ItemActions.Done)
  onDone(ctx: StateContext<IItemStateModel>) {
    ctx.patchState({
      loading: false,
      busy: false
    });
  }

  @Action(ItemActions.Loading)
  onLoading(ctx: StateContext<IItemStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(ItemActions.Working)
  onWorking(ctx: StateContext<IItemStateModel>) {
    ctx.patchState({
      busy: true
    });
  }

  @Action(ItemActions.LoadItems)
  onLoadItems(ctx: StateContext<IItemStateModel>, action: ItemActions.LoadItems) {
    ctx.patchState({
      loading: true
    });

    const {pageNumber, pageSize, sortField, sortOrder, filters, searchTerm} = action.request;
    return this.itemService.getItems(pageNumber, pageSize, sortField, sortOrder, filters, searchTerm).pipe(
      tap(response => ctx.patchState({
        paginatedResponse: response,
      }))
    );


  }


}
