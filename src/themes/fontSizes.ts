const fontSizeValues = [12, 14, 16, 20, 24, 32];

type FontSizesType = number[] & {
  extraSmall: number;
  small: number;
  medium: number;
  mediumLarge: number;
  large: number;
  extraLarge: number;
};

const fontSizes = fontSizeValues as unknown as FontSizesType;

fontSizes.extraSmall = fontSizes[0];
fontSizes.small = fontSizes[1];
fontSizes.medium = fontSizes[2];
fontSizes.mediumLarge = fontSizes[3];
fontSizes.large = fontSizes[4];
fontSizes.extraLarge = fontSizes[5];

export default fontSizes;
