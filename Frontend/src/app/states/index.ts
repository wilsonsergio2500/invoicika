import {AuthState} from "./auth";
import {ItemState} from "./item";

export * from './auth/auth.state';
export * from './item/item.state';

export function getStates() {
  return [
    AuthState,
    ItemState,
  ];
}
