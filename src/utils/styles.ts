import { theme } from '@/themes';
import type { Responsive, ResponsiveProp } from '@/types/styles';

export type AppTheme = typeof theme;

type SpaceThemeKeys = keyof typeof theme.space;
type ColorThemeKeys = keyof typeof theme.colors;
type FontSizeThemeKeys = keyof typeof theme.fontSizes;
type LineHeightThemeKeys = keyof typeof theme.lineHeights;
type LetterSpacingThemeKeys = keyof typeof theme.letterSpacings;

// 各themeキーの型
export type Space = SpaceThemeKeys | (string & {});
export type Color = ColorThemeKeys | (string & {});
export type FontSize = FontSizeThemeKeys | (string & {});
export type LineHeight = LineHeightThemeKeys | (string & {});
export type LetterSpacing = LetterSpacingThemeKeys | (string & {});

// ブレークポイント
const BREAKPOINTS: { [key: string]: string } = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

/**
 * Resoponsive型をCSSプロパティとその値に変換
 * @param propKey CSSプロパティ
 * @param prop Responsive型の値
 * @param theme AppTheme
 * @returns CSSプロパティとその値
 * @example
 * toPropValue('margin', { base: 'small', sm: 'medium' }, theme);
 */
export function toPropValue<T>(
  propKey: string,
  prop?: Responsive<T>,
  theme?: AppTheme,
) {
  if (prop === undefined) return undefined;

  if (isResponsivePropType<T>(prop)) {
    const result = [];
    for (const responsiveKey in prop) {
      if (responsiveKey === 'base') {
        result.push(
          `${propKey}: ${toThemeValueIfNeeded(propKey, prop[responsiveKey], theme)}`,
        );
      } else if (
        responsiveKey === 'sm' ||
        responsiveKey === 'md' ||
        responsiveKey === 'lg' ||
        responsiveKey === 'xl'
      ) {
        const breakpoint = BREAKPOINTS[responsiveKey];
        const styles = `${propKey}: ${toThemeValueIfNeeded(
          propKey,
          prop[responsiveKey],
          theme,
        )};`;
        result.push(
          `@media screen and (min-width: ${breakpoint}) { ${styles} }`,
        );
      }
    }
    return result.join('\n');
  }
  return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)}`;
}

const SPACE_KEYS = new Set([
  'margin',
  'margin-top',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'padding',
  'padding-top',
  'padding-bottom',
  'padding-left',
  'padding-right',
]);
const COLOR_KEYS = new Set(['color', 'background-color']);
const FONT_SIZE_KEYS = new Set(['font-size']);
const LINE_HEIGHT_KEYS = new Set(['line-height']);
const LETTER_SPACING_KEYS = new Set(['letter-spacing']);

/**
 * CSSプロパティの値を、Themeに定義された値に変換する
 * @param propKey CSSプロパティ
 * @param value CSSプロパティの値
 * @param theme AppTheme
 * @returns CSSプロパティの値
 * @example
 * toThemeValueIfNeeded('margin', 'small', theme);
 */
function toThemeValueIfNeeded<T>(
  propKey: string,
  value: T,
  theme?: AppTheme,
): T | string {
  if (
    theme &&
    theme.space &&
    SPACE_KEYS.has(propKey) &&
    isSpaceThemeKeys(value, theme)
  ) {
    return theme.space[value] as string;
  } else if (
    theme &&
    theme.colors &&
    COLOR_KEYS.has(propKey) &&
    isColorThemeKeys(value, theme)
  ) {
    return theme.colors[value] as unknown as string;
  } else if (
    theme &&
    theme.fontSizes &&
    FONT_SIZE_KEYS.has(propKey) &&
    isFontSizeThemeKeys(value, theme)
  ) {
    return theme.fontSizes[value] as unknown as string;
  } else if (
    theme &&
    theme.lineHeights &&
    LINE_HEIGHT_KEYS.has(propKey) &&
    isLineHeightThemeKeys(value, theme)
  ) {
    return theme.lineHeights[value] as unknown as string;
  } else if (
    theme &&
    theme.letterSpacings &&
    LETTER_SPACING_KEYS.has(propKey) &&
    isLetterSpacingThemeKeys(value, theme)
  ) {
    return theme.letterSpacings[value] as unknown as string;
  }
  return value;
}

function isResponsivePropType<T>(prop: unknown): prop is ResponsiveProp<T> {
  if (typeof prop !== 'object' || prop == null) return false;
  return (
    'base' in prop ||
    'sm' in prop ||
    'md' in prop ||
    'lg' in prop ||
    'xl' in prop
  );
}

/**
 * propがtheme.spaceに含まれるか確認する
 * @param prop
 * @param theme
 * @returns boolean
 * @example
 * isSpaceThemeKeys('small', theme);
 */
function isSpaceThemeKeys(
  prop: unknown,
  theme: AppTheme,
): prop is SpaceThemeKeys {
  if (typeof prop !== 'string') return false;
  return prop in theme.space;
}

/**
 * propがtheme.colorsに含まれるか確認する
 * @param prop
 * @param theme
 * @returns boolean
 * @example
 * isColorThemeKeys('primary', theme);
 */
function isColorThemeKeys(
  prop: unknown,
  theme: AppTheme,
): prop is ColorThemeKeys {
  if (typeof prop !== 'string') return false;
  return prop in theme.colors;
}

/**
 * propがtheme.fontSizesに含まれるか確認する
 * @param prop
 * @param theme
 * @returns boolean
 * @example
 * isFontSizeThemeKeys('small', theme);
 */
function isFontSizeThemeKeys(
  prop: unknown,
  theme: AppTheme,
): prop is FontSizeThemeKeys {
  if (typeof prop !== 'string') return false;
  return prop in theme.fontSizes;
}

/**
 * propがtheme.lineHeightsに含まれるか確認する
 * @param prop
 * @param theme
 * @returns boolean
 * @example
 * isLineHeightThemeKeys('small', theme);
 */
function isLineHeightThemeKeys(
  prop: unknown,
  theme: AppTheme,
): prop is LineHeightThemeKeys {
  if (typeof prop !== 'string') return false;
  return prop in theme.lineHeights;
}

/**
 * propがtheme.letterSpacingsに含まれるか確認する
 * @param prop
 * @param theme
 * @returns boolean
 * @example
 * isLetterSpacingThemeKeys('small', theme);
 */
function isLetterSpacingThemeKeys(
  prop: unknown,
  theme: AppTheme,
): prop is LetterSpacingThemeKeys {
  if (typeof prop !== 'string') return false;
  return prop in theme.letterSpacings;
}
