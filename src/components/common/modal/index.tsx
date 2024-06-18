import React from 'react';

import { useTheme } from '@theme/index';

import RNModal, { type ModalProps as RNModalProps } from 'react-native-modal';

import type { Color } from '@theme/colors';

interface IModal extends Partial<Omit<RNModalProps, 'backdropColor' | 'children'>> {
  backdropColor?: Color;
  isDefaultModal?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ children, backdropColor = 'black_40', isDefaultModal = false, ...props }) => {
  const { colors } = useTheme();

  return <RNModal backdropColor={colors[backdropColor]} children={children} animationOut="slideOutDown" {...props} />;
};

export { Modal, type IModal };
