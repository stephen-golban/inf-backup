import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon } from '@components/common';

import { DEFAULT, PinCodeT } from '@anhnch/react-native-pincode';

import type { AppTheme } from '@theme/index';

export const PinCodeOptions: PinCodeT.Options = {
  pinLength: 5,
  maxAttempt: 3,
  allowReset: true,
  backSpace: <Icon icon="BackSpaceIcon" size={30} color="white" />,
};

const PinCodeCustomTextesEN: PinCodeT.TextOptions = {
  enter: {
    title: 'Enter PIN',
    subTitle: 'Enter PIN to access.',
    error: 'Wrong PIN! Try again.',
    footerText: 'Forgot PIN?',
  },
  set: {
    title: 'Set up a new PIN',
    subTitle: 'Enter {{pinLength}} digits.',
    repeat: 'Enter new PIN again.',
    error: "PIN doesn't match. Start the process again.",
    cancel: undefined,
  },
  locked: {
    title: 'Locked',
    subTitle: 'Wrong PIN {{maxAttempt}} times.\nTemporarily locked for {{lockDuration}}.',
  },
  reset: {
    title: 'Forgot PIN?',
    subTitle: 'Remove the PIN may wipe out the app data and settings.',
    resetButton: 'Reset',
    confirm: 'Are you sure you want to remove the PIN?',
    confirmButton: 'Confirm',
    footerText: 'Back',
  },
};

const PinCodeCustomTextesRO: PinCodeT.TextOptions = {
  enter: {
    title: 'Introduceți PIN-ul',
    subTitle: 'Introduceți PIN-ul pentru acces.',
    error: 'PIN greșit! Încercați din nou.',
    footerText: 'Ați uitat PIN-ul?',
  },
  set: {
    title: 'Setați un nou PIN',
    subTitle: 'Introduceți {{pinLength}} cifre.',
    repeat: 'Introduceți din nou noul PIN.',
    error: 'PIN-ul nu se potrivește. Reîncepeți procesul.',
    cancel: undefined,
  },
  locked: {
    title: 'Blocată',
    subTitle: 'PIN greșit de {{maxAttempt}} ori.\nBlocată temporar pentru {{lockDuration}}.',
  },
  reset: {
    title: 'Ați uitat PIN-ul?',
    subTitle: 'Eliminarea PIN-ului poate șterge datele și setările aplicației.',
    resetButton: 'Resetați',
    confirm: 'Sigur doriți să eliminați PIN-ul?',
    confirmButton: 'Confirmați',
    footerText: 'Înapoi',
  },
};

const PinCodeCustomTextesRU: PinCodeT.TextOptions = {
  enter: {
    title: 'Введите PIN',
    subTitle: 'Введите PIN для доступа.',
    error: 'Неправильный PIN! Попробуйте снова.',
    footerText: 'Забыли PIN?',
  },
  set: {
    title: 'Установите новый PIN',
    subTitle: 'Введите {{pinLength}} цифр.',
    repeat: 'Введите новый PIN снова.',
    error: 'PIN не совпадает. Начните процесс заново.',
    cancel: undefined,
  },
  locked: {
    title: 'Заблокировано',
    subTitle: 'Неправильный PIN {{maxAttempt}} раз.\nВременно заблокировано на {{lockDuration}}.',
  },
  reset: {
    title: 'Забыли PIN?',
    subTitle: 'Удаление PIN может стереть данные и настройки приложения.',
    resetButton: 'Сбросить',
    confirm: 'Вы уверены, что хотите удалить PIN?',
    confirmButton: 'Подтвердить',
    footerText: 'Назад',
  },
};

export const PinCodeCustomTextes = (language: string) => {
  switch (language) {
    case 'ro':
      return PinCodeCustomTextesRO;
    case 'ru':
      return PinCodeCustomTextesRU;
    case 'en':
    default:
      return PinCodeCustomTextesEN;
  }
};

export const PinCodeStyles = (theme: AppTheme) => {
  return {
    main: {
      zIndex: 99,
      backgroundColor: theme.colors.blue,
      ...StyleSheet.absoluteFillObject,
    },
    enter: {
      ...DEFAULT.Styles.enter,
      buttonText: {
        color: theme.colors.black,
      },
    },
    set: {
      ...DEFAULT.Styles.set,
      buttonText: {
        color: theme.colors.black,
      },
    },
    locked: {
      ...DEFAULT.Styles.locked,
      buttonText: {
        color: theme.colors.black,
      },
    },
    reset: {
      ...DEFAULT.Styles.reset,
      resetButton: {
        color: theme.colors.black,
      },
      buttonText: {
        color: theme.colors.black,
      },
    },
  } as PinCodeT.PinCodeStyles;
};
