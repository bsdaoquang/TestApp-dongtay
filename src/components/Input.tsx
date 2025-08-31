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
import TextComponent from './TextComponent';

export interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  inputStyle?: TextStyle;
  styles?: TextStyle;
  password?: boolean;
  allowClear?: boolean;
  required?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
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
    required,
    keyboardType = 'default',
  } = props;

  const [isSecure, setIsSecure] = useState(password ? true : false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Row
        style={[
          globalStyles.containerInput,
          {
            borderColor: error.isError ? colors.error : colors.border,
          },
          styles,
        ]}
      >
        <TextInput
          keyboardType={keyboardType}
          onFocus={() => {
            if (error.isError) {
              setError({
                isError: false,
                message: '',
              });
            }
          }}
          placeholder={required ? `* ${placeholder}` : placeholder}
          placeholderTextColor={colors.placeholder}
          value={inputValue}
          onChangeText={setInputValue}
          style={[globalStyles.inputStyle, inputStyle]}
          secureTextEntry={isSecure}
          onBlur={
            required
              ? () => {
                  if (inputValue.trim().length === 0) {
                    setError({
                      isError: true,
                      message: 'This field is required',
                    });
                  }
                }
              : undefined
          }
        />
        {allowClear && inputValue.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <CloseCircle
              size={18}
              variant="Linear"
              color={colors.description}
            />
          </TouchableOpacity>
        )}
        {password && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {
              /* EyeSlash icon when the password is hidden, Eye icon when it's visible */
              !isSecure ? (
                <EyeSlash
                  size={18}
                  variant="Linear"
                  color={colors.description}
                />
              ) : (
                <Eye size={18} variant="Linear" color={colors.description} />
              )
            }
          </TouchableOpacity>
        )}
      </Row>
      {error.isError && error.message.length > 0 && (
        <TextComponent
          styles={{ marginTop: 6 }}
          text={error.message}
          color={colors.error}
        />
      )}
    </View>
  );
};

export default Input;
