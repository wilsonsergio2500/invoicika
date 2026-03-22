export interface BasePaginationResponse<T> {
  currentPage: number;
  items: Array<T>;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
