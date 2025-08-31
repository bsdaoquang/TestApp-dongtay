import {
  View,
  Text,
  TextStyle,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Row from './Row';
import { globalStyles } from '../styles/globalStyle';
import { colors } from '../constants/colors';
import { CloseCircle, Eye, EyeSlash } from 'iconsax-react-nativejs';

export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  inputStyle?: TextStyle;
  styles?: TextStyle;
  password?: boolean;
  allowClear?: boolean;
}

const Input = (props: InputProps) => {
  const {
    placeholder,
    value,
    onChange,
    inputStyle,
    styles,
    password,
    allowClear,
  } = props;

  const [isSecure, setIsSecure] = useState(password ? true : false);
  const [inputValue, setInputValue] = useState(value);

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <Row style={[globalStyles.containerInput, styles]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        value={inputValue}
        onChangeText={setInputValue}
        style={[globalStyles.inputStyle, inputStyle]}
        secureTextEntry={isSecure}
      />
      {allowClear && inputValue.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <CloseCircle size={18} variant="Linear" color={colors.description} />
        </TouchableOpacity>
      )}
      {password && (
        <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
          {
            /* EyeSlash icon when the password is hidden, Eye icon when it's visible */
            !isSecure ? (
              <EyeSlash size={18} variant="Linear" color={colors.description} />
            ) : (
              <Eye size={18} variant="Linear" color={colors.description} />
            )
          }
        </TouchableOpacity>
      )}
    </Row>
  );
};

export default Input;
