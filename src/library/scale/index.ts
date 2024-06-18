import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;

const guidelineBaseHeight = 680;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;

const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;

const sizeScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

const calculateRatioFontSize = (value: number, size: number) => {
  const length = Math.max(1, Math.floor(Math.log10(Math.abs(value)) + 1));
  const baseFontSize = PixelRatio.roundToNearestPixel(size * 0.5);
  return Math.min(baseFontSize, PixelRatio.roundToNearestPixel(size / (1.3 * length)));
};

export { verticalScale, sizeScale, calculateRatioFontSize };
