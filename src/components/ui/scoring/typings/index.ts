import { type ImageSourcePropType } from 'react-native';

export type ArrowLength = 'small' | 'medium' | 'big';

export type NonUndefined<T> = T extends undefined ? never : T;

export type Segment = {
  label: string;
  image: ImageSourcePropType;
  color: NonUndefined<React.CSSProperties['color']>;
};
