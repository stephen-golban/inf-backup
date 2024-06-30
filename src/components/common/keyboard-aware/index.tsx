import { createStyled } from '@library/restyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const _KeyboardAware = createStyled(KeyboardAwareScrollView);
export type KeyboardAwareProps = React.ComponentProps<typeof _KeyboardAware>;

export const KeyboardAware: React.FC<KeyboardAwareProps> = props => {
  return (
    <_KeyboardAware
      {...props}
      // bounces={false}
      enableOnAndroid
      // overScrollMode="always"
      enableResetScrollToCoords={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      contentInsetAdjustmentBehavior="always"
      extraScrollHeight={100}
    />
  );
};
