import { createStyled } from '@library/restyle';
import { type ComponentProps, forwardRef } from 'react';
import { ScrollView as RNScrollView } from 'react-native';

const _ScrollView = createStyled(RNScrollView);

type ScrollViewProps = ComponentProps<typeof _ScrollView>;

const ScrollView = forwardRef<RNScrollView, ScrollViewProps>((props, ref) => {
  return (
    <_ScrollView
      ref={ref}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
});

export { ScrollView };
export type { ScrollViewProps };
