import type { IAppState } from '@typings/app';
import type { RegisterFormFields } from '@modules/logged-out/register/resolver';
import { format } from 'date-fns';

export const createQueryParams = (values: RegisterFormFields, locale: IAppState['locale'], base64Image: string | null) => {
  const { identityNumber, firstName, lastName, birthDate, email, phone, promoCode } = values;
  return {
    identityNumber,
    firstName,
    lastName,
    promoCode,
    photo: base64Image,
    language: locale.toUpperCase(),
    birthDate: format(birthDate || new Date(), 'yyyy-MM-dd'),
    contactData: [
      {
        type: 'EMAIL',
        value: email,
        invoiceDisplay: true,
        invoiceSending: true,
        credentialsSending: false,
        informationSending: true,
      },
      {
        type: 'PHONE',
        invoiceDisplay: true,
        invoiceSending: false,
        value: phone,
        credentialsSending: false,
        informationSending: true,
      },
    ],
    identityDocumentData: null,
  };
};
