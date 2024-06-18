import { getKeys } from '../util';
import { SPACING, Spacing } from '@theme/metrics';
import { RNStyleProperty, createRestyleFunction } from '@shopify/restyle';

const properties = {
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  g: 'gap',
  rg: 'rowGap',
  cg: 'columnGap',
};

const spacing = getKeys(properties).map(property => {
  const styleProperty = properties[property] as RNStyleProperty;

  return createRestyleFunction({
    property,
    styleProperty,
    transform: ({ value }: { value: Spacing }) => (typeof value === 'number' ? value : SPACING[value]),
  });
});

type SpacingProps = {
  [Key in keyof typeof properties]?: Spacing;
};

export { spacing, type SpacingProps };
