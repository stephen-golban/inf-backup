export interface IFaqResponse {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}

export interface Embedded {
  entityModelList: EntityModelList[];
}

export interface EntityModelList {
  id: number;
  mainImage: string;
  mainTitle: string;
  items: Item[];
  _links: Links;
}

export interface Item {
  id: number;
  image: string;
  title: string;
  subtitle: any;
  text?: string;
  buttonTitle: string;
  buttonUrl: any;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Links2 {
  self: Self2;
}

export interface Self2 {
  href: string;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface IItemStyles {
  id: number;
  background: string;
}
