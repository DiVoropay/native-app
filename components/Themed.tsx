/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';
// import DefaultCheckbox, {CheckboxProps as DefaultCheckboxProps} from 'expo-checkbox';
import { Checkbox as DefaultCheckbox} from 'react-native-paper';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { selectApp } from '../store/slices/appSlice';
import DefaultAutocomplete, { AutocompleteProps as DeafultAutocompleteProps } from 'react-native-autocomplete-input';
import { FontAwesome as DefaultFontAwesome} from '@expo/vector-icons';
import { Icon, IconProps } from '@expo/vector-icons/build/createIconSet';
// import { CheckBoxComponent as DefaultCheckbox } from '@react-native-community/checkbox';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { theme } = useSelector(selectApp);

  //const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type AutocompleteProps = ThemeProps & DeafultAutocompleteProps<any>;
export type ViewProps = ThemeProps & DefaultView['props'];
export type CheckboxProps = ThemeProps & any;
export type FontAwesomeProps = ThemeProps & any //typeof DefaultFontAwesome & Icon<string, string> ;



export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backcover');

  return <DefaultTextInput style={[{ color, backgroundColor }, style]} {...otherProps} />;
}

export function Autocomplete(props: AutocompleteProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultAutocomplete style={[{ color }, style]} {...otherProps} />;
}

export function Checkbox(props: CheckboxProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = otherProps.color || useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return <DefaultCheckbox {...otherProps} color={color} uncheckedColor={color} />;
}

export function FontAwesome(props: FontAwesomeProps) {
  const { lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

  return <DefaultFontAwesome color={ color } {...otherProps} />;
}


export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
