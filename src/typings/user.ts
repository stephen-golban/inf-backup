export type User = {
  id: number;
  photo: string;
  username: string;
  lastName: string;
  birthDate: string;
  firstName: string;
  accounts: Accounts;
  identityNumber: string;
  contactData: ContactData;
  identityDocumentData: IdentityDocumentData;
};

type IdentityDocumentData = {
  id: number;
  termDate: string;
  issueDate: string;
  identityDocument: string;
};

type ContactData = Array<{
  value: string;
  type: 'EMAIL' | 'PHONE';
  invoiceDisplay: boolean;
  invoiceSending: boolean;
  credentialsSending: boolean;
  informationSending: boolean;
}>;

type Accounts = Array<{
  accountId: number;
  accountStatus: 'ACTIVE' | 'INACTIVE';
}>;
