export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type IContactDetailResponse = {
  message: string;
  data: Contact;
};
