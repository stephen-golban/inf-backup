import type { TextProps } from '../text';
import type { ViewProps } from '../view';
import type { ReactElement } from 'react';
import type { ButtonProps } from '../button';
import type { I18nKey } from '@translations/locales';

export type TabsItemProps = {
  title: I18nKey;
  onTabPress?(): void;
  badgeCount?: number;
  textProps?: Omit<TextProps, 'ref'>;
} & Pick<ButtonProps, 'onLayout' | 'children' | 'onPress'>;

export type TabsProps = {
  onTabsPress?(index: number): void;
  tabSpace?: ViewProps['cg'];
  defaultSelectedTab?: number | I18nKey;
  children: ReactElement<TabsItemProps>[];
} & Pick<ViewProps, 'fill' | 'justify' | 'mt'>;
