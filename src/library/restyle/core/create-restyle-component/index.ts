import type { ComponentProps, ComponentType } from 'react';
import type { RestyleFunctionContainer } from '../../typings';

import { type AppTheme, useTheme } from '@theme/index';
import { base_properties, type BaseProps } from '../../properties';
import { buildRestyleComponent } from '../build-restyle-component';

const createRestyleComponent = <C extends ComponentType<any>>(BaseComponent: C) => {
  type RestyleProps = BaseProps<AppTheme> & Omit<ComponentProps<C>, keyof BaseProps<AppTheme>>;

  const theme = useTheme();

  const RestyledComponent = buildRestyleComponent<RestyleProps, AppTheme>(
    base_properties(theme) as RestyleFunctionContainer<BaseProps<AppTheme>, AppTheme>[],
    BaseComponent,
  );

  return RestyledComponent;
};

export { createRestyleComponent };
