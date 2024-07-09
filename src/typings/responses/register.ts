type ContactData = {
  type: string;
  value: string;
  invoiceDisplay: boolean;
  invoiceSending: boolean;
  credentialsSending: boolean;
  informationSending: boolean;
};

export type RegisterApiResponse = {
  language: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  identityNumber: string;
  contactData: ContactData[];
  identityDocumentData: {
    termDate: string;
    issueDate: string;
    identityDocument: string;
  };
};
