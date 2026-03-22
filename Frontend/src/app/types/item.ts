import {BasePaginationResponse} from "./base-pagination-response";

export type ItemsPaginatedResponse = BasePaginationResponse<ItemModel>;

export type ItemModel = {
  itemId: string,
  name: string,
  description: string | null,
  purchasePrice: number,
  salePrice: number,
  quantity: number,
  createdDate: string,
}
