import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';


import metrics from '../../constants/layout';
import * as Typography from '../Atoms/Typography'
import fonts from '../../constants/fontsSize'

interface data_objects {
  name: string;

}

interface Props {
  label?: string;
  value?: string | undefined 
  placeholder?: string;
  dropdowndata: data_objects[];
  width?: number;
  onDropdownChange?: (value: data_objects) => void;
}

export const DropdownComponent: React.FC<Props> = ({
  placeholder,
  dropdowndata,
  width,
  value,
  label,
  onDropdownChange, // callback function
}) => {
  const handleItemSelected = (item: data_objects) => {
    onDropdownChange && onDropdownChange(item);
  };

  return (
    <View>
      {label ? <Typography.Title size={fonts.font12}>{label}</Typography.Title> : null}
      <Dropdown
        style={[
          styles.dropdown,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropdowndata}
        search
        value={value}
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={placeholder || 'Select' }
        searchPlaceholder="Search..."
        onChange={item => handleItemSelected(item)}
        containerStyle={{
            backgroundColor: '#fff',
          }}
          itemTextStyle={{
            color: '#000',
            fontFamily: 'Montserrat-Regular',
            fontSize: 15,
          }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: metrics.screenWidth * 0.92,
        backgroundColor: '#fff',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 12,
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
});