import type { BaseTheme } from '../typings';

import { useContext } from 'react';

import { ThemeContext } from './provider';

const useRestyleTheme = <Theme extends BaseTheme = BaseTheme>() => useContext(ThemeContext) as Theme;

export { useRestyleTheme };
