import * as React from 'react';

import * as TabsPrimitive from '@rn-primitives/tabs';

import { useStyle } from '@library/hooks';
import { createStyled } from '@library/restyle';

import { Text } from '../text';

import style from './style';

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'value' | 'onValueChange'> & {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
  }
>(({ value, onValueChange, defaultValue, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue);
      } else {
        setInternalValue(newValue);
      }
    },
    [onValueChange],
  );

  React.useEffect(() => {
    if (defaultValue && !value && !internalValue) {
      handleValueChange(defaultValue);
    }
  }, [defaultValue, value, internalValue, handleValueChange]);

  return <TabsPrimitive.Root ref={ref} value={value !== undefined ? value : internalValue} onValueChange={handleValueChange} {...props} />;
});

TabsRoot.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ style: listStyle, ...props }, ref) => {
    const styles = useStyle(style);
    return <TabsPrimitive.List ref={ref} style={[styles.tabList, listStyle]} {...props} />;
  },
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ style: triggerStyle, ...props }, ref) => {
  const styles = useStyle(style);
  const { value } = TabsPrimitive.useRootContext();
  const isActive = value === props.value;

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      style={[styles.tabTrigger, isActive ? styles.activeTab : styles.inactiveTab, triggerStyle as any]}
      {...props}>
      <Text text={props.value} variant="16-semi" color={isActive ? 'blue' : 'black'} />
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>((props, ref) => <TabsPrimitive.Content ref={ref} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

const Tabs = {
  Root: createStyled(TabsRoot),
  List: createStyled(TabsList),
  Trigger: createStyled(TabsTrigger),
  Content: createStyled(TabsContent),
};

export { Tabs };
