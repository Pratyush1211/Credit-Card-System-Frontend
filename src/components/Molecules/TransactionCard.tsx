import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import metrics from '../../constants/layout';

interface Transaction_Props {
    firstName: string;
    lastName?:string | undefined ;
    gender?: string;
    merchant?: string;
    state?: string;
    amount?: number;
    transactionDataandTime?: string;
    category?: string;
    transactionNumber?: number;
    city?: string;
    cityPopulation?: number;
    customerId?: number;
    dob?: string;
    job?: string;
}

const TransactionCard = ({
    firstName,
    gender,
    lastName,
    merchant,
    state,
    amount,
    transactionDataandTime,
    category,
    transactionNumber,
    city,
    cityPopulation,
    customerId,
    dob,
    job,
  }: Transaction_Props) => {
    return (
      <View style={styles.card}>
        <Text>
          Name: {firstName} {lastName}
        </Text>
        <Text>Gender: {gender}</Text>
        <Text>Merchant: {merchant}</Text>
        <Text>State: {state}</Text>
        <Text>Amount: ${amount?.toFixed(2)}</Text>
        <Text>Date and Time: {transactionDataandTime}</Text>
        <Text>Category: {category}</Text>
        <Text>Transaction Number: {transactionNumber}</Text>
        <Text>City: {city}</Text>
        <Text>City Population: {cityPopulation}</Text>
        <Text>Customer ID: {customerId}</Text>
        <Text>Date of Birth: {dob}</Text>
        <Text>Job: {job}</Text>
      </View>
    );
  };
const styles = StyleSheet.create({
    card: {
        width: metrics.screenWidth * 0.92,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 20,
        marginVertical: 10,
        elevation: 2,
      },
})

export default TransactionCard