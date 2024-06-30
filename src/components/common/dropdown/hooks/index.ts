import { useState } from 'react';
import { useTheme } from '@theme/index';

import type { DropdownValue, IDropdown } from '../type';

export default function useDropdown({ data, defaultValue, onChange }: Pick<IDropdown, 'data' | 'defaultValue' | 'onChange'>) {
  const { colors } = useTheme();

  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const isLastItem = (item: DropdownValue) => data.indexOf(item) === data.length - 1;

  function handleOnChange(item: DropdownValue) {
    setValue(item);
    setIsFocused(false);

    if (onChange) {
      onChange(item);
    }
  }

  return { isLastItem, handleOnChange, isFocused, setIsFocused, value, colors };
}
