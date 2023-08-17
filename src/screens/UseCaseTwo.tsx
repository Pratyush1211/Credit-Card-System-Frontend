import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import * as Typography from "../components/Atoms/Typography";
import Textinput from "../components/Molecules/TextInput";
import DropdownComponent from "../components/Molecules/Dropdown";
import creditcardinstance from "../api/server";
import { BtnOutline } from "../components/Atoms/Button";
import LoadingScreen from "../components/Atoms/LoadingScreen";

export default function UseCaseTwo() {
  const [loading, setloading] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [job, setjob] = useState("");
  const [customerid, setcustomerid] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState([
    {
      name: "M",
    },
    {
      name: "F",
    },
  ]);
  const [selectedgender, setselectedgender] = useState(null);

  const handleGenderSelection = (item: any) => {
    console.log(item);
    setselectedgender(item.name);
  };

  const handleNewCustomer = async () => {
    setloading(true);
    try {
      const response = await creditcardinstance.post(`customers`, {
        firstName: firstname,
        lastName: lastname,
        job: job,
        customerId: customerid,
        dob: dob,
        gender: selectedgender,
      });
      const { message } = response.data;
      Alert.alert(message);
      setselectedgender(null)
      setfirstname("");
      setlastname("");
      setjob("");
      setcustomerid("");
      setdob("");
      setloading(false);
    } catch (err: any) {
      console.log(err.response.data);
      const { message } = err.response.data;
      Alert.alert(message);
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      {
          loading ? <LoadingScreen /> : null
      }
      <Typography.Title>Register a new credit card</Typography.Title>

      <Textinput
        label="First name"
        placeholder="Enter your first name"
        value={firstname}
        handleText={(text: string) => setfirstname(text)}
      />
      <Textinput
        label="Last name"
        placeholder="Enter your last name"
        value={lastname}
        handleText={(text: string) => setlastname(text)}
      />
      <Textinput
        label="Job"
        placeholder="Enter your job"
        value={job}
        handleText={(text: string) => setjob(text)}
      />
      <Textinput
        label="Customer ID"
        placeholder="Enter your customer ID"
        value={customerid}
        handleText={(text: string) => setcustomerid(text)}
      />
      <Textinput
        label="Date of birth"
        placeholder="Enter your date of birth"
        value={dob}
        handleText={(text: string) => setdob(text)}
      />

      <DropdownComponent
        label="Gender"
        placeholder="select"
        dropdowndata={gender}
        onDropdownChange={handleGenderSelection}
      />
      {/* <Button title='Submit' onPress={()=>setLoading(!isLoading)}> */}
      <BtnOutline
        onPress={handleNewCustomer}
        label="Submit"
        color="#7BB274"
        width={150}
        labelsize={15}
        labelcolor="#000"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
});
