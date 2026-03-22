import {ItemsPaginatedResponse} from "@types";

export interface IItemStateModel {
  loading: boolean;
  busy: boolean;
  current: ItemType | null;
  paginatedResponse: ItemsPaginatedResponse | null;
}

export type ItemType = {}

export type ItemFetchRequest = {
  pageNumber: number,
  pageSize: number,
  sortField: string | null,
  sortOrder: string | null,
  filters: Array<{ key: string; value: string[] }>,
  searchTerm: string | null
}


