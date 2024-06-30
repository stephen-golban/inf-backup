import type { Color } from '@theme/colors';

export type DropdownValue = { label: string; value: string };

export interface IDropdown {
  bg?: Color;
  placeholder?: string;
  data: DropdownValue[];
  defaultValue?: DropdownValue;
  onChange?(arg: DropdownValue): void;
}
