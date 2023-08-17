import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../constants/fontsSize';
import colors from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Typography from '../Atoms/Typography';
import metrics from '../../constants/layout';

interface Props {
  placeholder?: string;
  label?: string;
  value?: string;
  keyboardtype?: string,
  handleText?: (text: string) => void;
  handlesubmit?: () => void;
  height?: number;
}

export const Textinput: React.FC<Props> = ({
  placeholder,
  label,
  value,
  height,
  keyboardtype,
  handleText,
  handlesubmit,
}) => {
  

  const handleChange = (text: string) => {
    handleText && handleText(text);
  };

  const handleSubmit = () => {
    handlesubmit && handlesubmit();
  };

  return (
    <View style={{marginVertical: 10}}>
      {label ? (
        <Typography.Title size={fonts.font12}>{label}</Typography.Title>
      ) : null}
      <TextInput
        style={[styles.inputContainer]}
        value={value}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        placeholder={placeholder}
        placeholderTextColor="gray"
        autoCapitalize="none"
        multiline={height ? true : false}
        keyboardType={keyboardtype}
      />
    </View>
  );
};

export const TextinputWithIcon: React.FC<Props> = ({
  placeholder,
  label,
  value,
  handleText,
  handlesubmit,
}) => {

  const [showtext, setshowtext] = useState(false)
  

  const handleChange = (text: string) => {
    handleText && handleText(text);
  };

  const handleSubmit = () => {
    handlesubmit && handlesubmit();
  };

  return (
    <View style={{marginVertical: 10, width: metrics.screenWidth , borderBottomWidth: 0.2, paddingHorizontal: 12, borderBottomColor: '#808080'}}>
      {label ? (
        <Typography.Title size={fonts.font12}>{label}</Typography.Title>
      ) : null}

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput
              style={[styles.inputContainer, { width: 0, flex: 0.9,backgroundColor: 'transparent', paddingHorizontal: 3}]}
              placeholder={placeholder}
              placeholderTextColor={'#8A8A8A'}
              onChangeText={handleChange}
              value={value}
              onSubmitEditing={handleSubmit}
              secureTextEntry={!showtext}
            />
       
            <MaterialCommunityIcons
             name={showtext ? 'eye-off' : 'eye-outline'}
             size={24}
             color="#8A8A8A"
             onPress={() => setshowtext(!showtext)}
            />
          
          </View>



    </View>
    
  );
};





const styles = StyleSheet.create({
  inputContainer: {
    height: metrics.screenWidth * 0.12,
    width: metrics.screenWidth * 0.92,
    fontSize: 15,
    paddingHorizontal: 10,
    color: '#8A8A8A',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    marginVertical: 5,
  },

  placeholderStyle: {
    color: '#8A8A8A',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  selectedTextStyle: {
    color: '#8A8A8A',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#FFF',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  TextContainer: {
    marginTop: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8A8A8A',
  },
});

export default Textinput;
