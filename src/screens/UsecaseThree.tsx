import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Typography from "../components/Atoms/Typography";
import Textinput from '../components/Molecules/TextInput';
import creditcardinstance from '../api/server';
import { BtnOutline } from '../components/Atoms/Button';
import LoadingScreen from '../components/Atoms/LoadingScreen';

export default function UsecaseThree() {

  const [loading, setloading] = useState(false)
  const [ customerId, setCustomerId] = useState("")
  const [ customerDetails ,setCustomerDetails] = useState(null);

  const handleDeleteCustomer = async() => {
    setloading(true)
    try {
      const response = await creditcardinstance.delete(`customers/${customerId}`);
      const { message, data } = response.data;
      Alert.alert(message);
      setCustomerDetails(data);
      setCustomerId("")
      setloading(false)
    } catch (err: any) {
      console.log(err.response.data);
      const { message } = err.response.data;
      Alert.alert(message);
      setloading(false)
    }
  }
  // {
  //   "data": {
  //     "customerId": 1000,
  //     "firstName": "string",
  //     "lastName": "string",
  //     "gender": "string",
  //     "job": "string",
  //     "dob": "string"
  //   },
  //   "message": "Data deleted successfully",
  //   "timestamp": "2023-08-18T02:53:25.102034",
  //   "status": 201
  // }

  return (
    <View style={styles.container}>
      {
        loading ? <LoadingScreen /> : null
      }
      <Typography.Title>Cancel a credit card</Typography.Title>
      <Textinput
        label="Enter your customer id"
        placeholder=""
        value={customerId}
        handleText={(text: string) => setCustomerId(text)}
      />
      <BtnOutline
        onPress={handleDeleteCustomer}
        label="Submit"
        color="#7BB274"
        width={150}
        labelsize={15}
        labelcolor="#000"
      />
      {
        customerDetails ?
        <View>
          <Text>Customer ID: {customerDetails.customerId}</Text>
          <Text>First Name: {customerDetails.firstName}</Text>
          <Text>Last Name: {customerDetails.lastName}</Text>
          <Text>Gender:{customerDetails?.gender === 'M'? 'Male': 'Female'} </Text>
          <Text>Job: {customerDetails.job}</Text>
          <Text>Date of Birth: {customerDetails.dob}</Text>
        </View>
        : null
        }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
})