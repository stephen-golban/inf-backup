import { useEffect, useState } from 'react';
import { Dimensions, type LayoutChangeEvent } from 'react-native';

import { type BadgeProps } from '@components/ui';

const BADGE_SIZE = 18;
const WW = Dimensions.get('window').width;

function useTabsItem(onLayout?: (e: LayoutChangeEvent) => void) {
  const [layout, setLayout] = useState({ x: 0, width: 0 });
  const [badgePosition, setBadgePosition] = useState<'r' | 'l'>('r');

  const onLayoutHandler = (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    setLayout({ x, width });
    if (onLayout) {
      onLayout(event);
    }
  };

  useEffect(() => {
    if (layout.x + layout.width + BADGE_SIZE > WW) {
      setBadgePosition('l');
    } else {
      setBadgePosition('r');
    }
  }, [layout]);

  const placement: BadgeProps['placement'] = badgePosition === 'l' ? 'top-left' : 'top-right';

  return { onLayoutHandler, placement, BADGE_SIZE };
}

export { useTabsItem };
