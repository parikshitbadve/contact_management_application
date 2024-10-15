import { Contact } from './Contact';

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Contact[];
}

export interface IContactResponse {
  message: string;
  data: Pagination;
}
