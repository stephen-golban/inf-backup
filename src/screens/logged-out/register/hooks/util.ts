import type { IAppState } from '@typings/app';
import type { RegisterFormFields } from '@modules/logged-out/register/resolver';
import { format } from 'date-fns';

export const createQueryParams = (values: RegisterFormFields, locale: IAppState['locale']) => {
  const { identityNumber, firstName, lastName, birthDate, email, phone, promoCode } = values;
  return {
    identityNumber,
    firstName,
    lastName,
    promoCode,
    language: locale.toUpperCase(),
    birthDate: format(birthDate || new Date(), 'yyyy-MM-dd'),
    contactData: [
      {
        type: 'EMAIL',
        value: email,
        invoiceDisplay: true,
        invoiceSending: true,
        credentialsSending: true,
        informationSending: true,
      },
      {
        type: 'PHONE',
        invoiceDisplay: true,
        invoiceSending: false,
        value: '+373' + phone,
        credentialsSending: true,
        informationSending: true,
      },
    ],
    identityDocumentData: {
      identityDocument: 'DF13242224',
      issueDate: '2024-05-01',
      termDate: '2034-05-01',
    },
  };
};
