import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BackHandler } from 'react-native';

interface IBottomSheet extends Omit<BottomSheetModalProps, 'ref' | 'backdropComponent' | 'handleComponent'> {
  isVisible: boolean;
  hideCloseIcon?: boolean;
  handleActiveOffsets?: boolean;
}

const BottomSheet: React.FC<IBottomSheet> = ({ children, snapPoints, hideCloseIcon, isVisible, handleActiveOffsets, ...rest }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const points = useMemo(() => snapPoints || ['50%'], [snapPoints]);

  useEffect(() => {
    const backAction = () => {
      if (isVisible) {
        bottomSheetRef.current?.close();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isVisible]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (isVisible) {
      openBottomSheet();
    } else {
      closeBottomSheet();
    }
  }, [isVisible]);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop {...props} pressBehavior="close" onPress={closeBottomSheet} disappearsOnIndex={-1} appearsOnIndex={0} />;
  }, []);

  const activeOffsetProps = React.useMemo(() => {
    if (handleActiveOffsets) {
      return { activeOffsetY: [-1, 1] as [number, number], failOffsetX: [-5, 5] as [number, number] };
    }
    return {};
  }, [handleActiveOffsets]);

  return (
    <BottomSheetModal
      {...activeOffsetProps}
      index={0}
      ref={bottomSheetRef}
      enablePanDownToClose
      snapPoints={points}
      backdropComponent={renderBackdrop}
      {...rest}>
      {children}
    </BottomSheetModal>
  );
};

export { BottomSheet };
