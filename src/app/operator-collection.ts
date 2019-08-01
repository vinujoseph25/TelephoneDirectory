export interface OperatorCollection {
  priceListCollection: Array<Operator>;
}

export interface Item {
  prefix: string;
  cost: number;
}

export interface Operator {
  operatorName: string;
  priceList: Array<Item>;
}

export interface FinalItem {
  operatorName: string;
  prefix: string;
  cost: number;
}
