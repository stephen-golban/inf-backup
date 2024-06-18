import { type AppTheme, useTheme } from '@theme/index';

export default function useStyle<T>(style: (theme: AppTheme) => T): T {
  const theme = useTheme();

  return style(theme);
}
