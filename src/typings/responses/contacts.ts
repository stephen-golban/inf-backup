export interface IContactsResponse {
  address: Address;
  contactData: ContactData;
  entityName: string;
  identityNumber: string;
  registrationDate: string;
}

export interface Address {
  addressType: string;
  apartment: string;
  block: string;
  country: number;
  county: number;
  locality: string;
  number: string;
  street: string;
}

export interface ContactData {
  emails: string[];
  phones: string[];
  webSites: string[];
}
