import { addYears, format } from 'date-fns';

export const createCardRegistrationBody = () => {
  const billerExpiry = format(addYears(new Date(), 5), 'MMyy');

  return {
    amount: 0,
    billerExpiry,
    currency: 'MDL',
    clientIp: '127.0.0.1',
    purchasedServiceName: null,
  };
};

export const getQueryParams = <T>(url: string) => {
  const params: { [key: string]: string } = {};

  const queryStringIndex = url.indexOf('?');

  if (queryStringIndex !== -1) {
    const queryString = url.substring(queryStringIndex + 1);

    const pairs = queryString.split('&');

    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
  }

  return params as T;
};
