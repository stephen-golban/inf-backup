import React from 'react';
import { Platform, UIManager, LayoutAnimation } from 'react-native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const useExpandAnimation = (defaultExpanded = false, animation: keyof typeof LayoutAnimation.Presets = 'easeInEaseOut') => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  const toggle = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets[animation]);
    return setIsExpanded(prev => !prev);
  }, []);

  return { toggle, isExpanded, setIsExpanded };
};

export default useExpandAnimation;
