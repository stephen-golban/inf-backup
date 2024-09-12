export interface SwitchRootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  /**
   * Platform: WEB ONLY
   */
  onKeyDown?: (ev: React.KeyboardEvent) => void;
}
