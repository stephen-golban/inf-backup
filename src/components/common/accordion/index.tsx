import * as AccordionPrimitive from '@rn-primitives/accordion';
import * as React from 'react';
import { Platform, Pressable, View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '../icon';

const AccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ children, ...props }, ref) => {
  return (
    <LayoutAnimationConfig skipEntering>
      <AccordionPrimitive.Root ref={ref} {...props} asChild={Platform.OS !== 'web'}>
        <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
      </AccordionPrimitive.Root>
    </LayoutAnimationConfig>
  );
});

AccordionRoot.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ value, ...props }, ref) => {
  return (
    <Animated.View style={styles.overflowHidden} layout={LinearTransition.duration(200)}>
      <AccordionPrimitive.Item ref={ref} style={styles.borderBottom} value={value} {...props} />
    </Animated.View>
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof Pressable>, React.ComponentPropsWithoutRef<typeof Pressable>>(
  ({ children, ...props }, ref) => {
    const { isExpanded } = AccordionPrimitive.useItemContext();

    const progress = useDerivedValue(() => (isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })));
    const chevronStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
      opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
    }));

    return (
      <AccordionPrimitive.Header style={styles.flex}>
        <AccordionPrimitive.Trigger ref={ref} {...props} asChild>
          <Trigger
            style={[
              styles.flexRow,
              styles.itemsCenter,
              styles.justifyBetween,
              styles.paddingVertical,
              styles.group,
              styles.focusVisibleOutline,
              styles.focusVisibleRing,
            ]}>
            <>{children}</>
            <Animated.View style={chevronStyle}>
              <Icon icon="ChevronDown" size={14} />
            </Animated.View>
          </Trigger>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => {
  const { isExpanded } = AccordionPrimitive.useItemContext();
  return (
    <AccordionPrimitive.Content
      style={[styles.overflowHidden, styles.textSmall, isExpanded ? styles.animateAccordionDown : styles.animateAccordionUp]}
      ref={ref}
      {...props}>
      <InnerContent style={styles.paddingBottom}>{children}</InnerContent>
    </AccordionPrimitive.Content>
  );
});

function InnerContent({ children, style }: { children: React.ReactNode; style?: any }) {
  if (Platform.OS === 'web') {
    return <View style={style}>{children}</View>;
  }
  return (
    <Animated.View entering={FadeIn} exiting={FadeOutUp.duration(200)} style={style}>
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const styles = StyleSheet.create({
  overflowHidden: {
    overflow: 'hidden',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Replace with your border color
  },
  flex: {
    display: 'flex',
  },
  flexRow: {
    flexDirection: 'row',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  paddingVertical: {
    paddingVertical: 16, // Adjust as needed
  },
  group: {
    // Add any group-specific styles here
  },
  focusVisibleOutline: {
    // Add focus-visible outline styles here
  },
  focusVisibleRing: {
    // Add focus-visible ring styles here
  },
  textForeground: {
    color: '#000', // Replace with your text color
  },
  textSmall: {
    fontSize: 14, // Adjust as needed
  },
  animateAccordionDown: {
    // Add animation styles for accordion down
  },
  animateAccordionUp: {
    // Add animation styles for accordion up
  },
  paddingBottom: {
    paddingBottom: 16, // Adjust as needed
  },
});

const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export { Accordion };
