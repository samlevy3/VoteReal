/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { 
  Text as DefaultText, 
  useColorScheme, 
  View as DefaultView, 
  TextInput as DefaultTextInput,
  TouchableOpacity, 
  StyleSheet } from 'react-native';



import Colors from '../constants/Colors';
import React from 'react';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
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

type AdditionalProps = {
  text: string; 
}

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type CardProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ThemeProps & TouchableOpacity['props'] & AdditionalProps;


export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultTextInput placeholderTextColor={color} style={[{ color }, style, styles.input]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Button = React.forwardRef((props: ButtonProps, ref: any) => {
  const { style, lightColor, darkColor, text, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }, style]} {...otherProps}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}); 

export function Card(props: CardProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
  return (
    <View style={[{ backgroundColor }, style]} {...otherProps} >
      <Text>New card yo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    marginVertical: 10,
    paddingVertical: 4,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    marginLeft: 20,
    width: '80%',
    alignSelf: 'flex-start',
  },
})