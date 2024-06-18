import { type ReactElement, Children } from 'react';
import type { TabsItemProps, TabsProps } from './type';

function getDefaultTabIndex({ defaultSelectedTab = 0, children }: TabsProps) {
  if (typeof defaultSelectedTab === 'string') {
    const child = Children.toArray(children).find(item => (item as ReactElement<TabsItemProps>).props.title === defaultSelectedTab);
    if (child) {
      return Children.toArray(children).indexOf(child);
    }
    return 0;
  }
  return defaultSelectedTab;
}
export { getDefaultTabIndex };
