import {ItemFetchRequest} from "@states/item/item.model";

export namespace ItemActions {
  export class Loading {
    static readonly type = '[Item] Set As Loading';
  }

  export class Working {
    static readonly type = '[Item] Set As Working';
  }

  export class LoadItems {
    static readonly type = '[Item] Load Items';

    constructor(public readonly request: ItemFetchRequest) {
    }

  }

  export class Done {
    static readonly type = '[Item] Set As Done';
  }


}


