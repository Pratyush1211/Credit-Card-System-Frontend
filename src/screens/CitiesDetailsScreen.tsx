import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import DropdownComponent from "../components/Molecules/Dropdown";
import LoadingScreen from "../components/Atoms/LoadingScreen";
import creditcardinstance from "../api/server";
import { SubTitle, Title } from "../components/Atoms/Typography";
import TransactionCard from "../components/Molecules/TransactionCard";

export default function CitiesDetailsScreen() {
  const [loading, setloading] = useState(false);
  const [infiniteloader, setinfiniteloader] = useState(false);

  const [citydata, setcityData] = useState([]);
  const [selectedcity, setSelectedcity] = useState("");
  const [cityInfo, setcityInfo] = useState(null);

  const [page, setPage] = useState(0);

  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    fetchCityList();
  }, []);

  const handleCitySelection = (item: any) => {
    setcityInfo(null);
    setTransactionData([]);
    setSelectedcity(item.name);
    fetchCityInfo(item.name);
  };

  const fetchCityList = async () => {
    setloading(true);
    try {
      const response = await creditcardinstance.get(`transactions/cities`);
      const { data } = response.data;
      const mappedData = data.map((name: string) => ({ name }));
      setcityData(mappedData);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  const fetchCityInfo = async (name: string) => {
    setloading(true);
    try {
      const response = await creditcardinstance.get(`transactions/cities`, {
        params: {
          city: name,
        },
      });
      const { data } = response.data;
      setcityInfo(data);
      fetchTransactionData();
      setloading(false);
    } catch (err: any) {
      console.log(err.response.data);
      setloading(false);
    }
  };

  const fetchTransactionData = async () => {
    setinfiniteloader(true);
    try {
      const response = await creditcardinstance.get(
        `transactions/by-cities/${selectedcity}`,
        {
          params: {
            page: page,
          },
        }
      );
      const { data, totalPages } = response.data;
      console.log(data);
      setTransactionData((prevData) => [...prevData, ...response.data.data]);
      setPage(page + 1);
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setinfiniteloader(false);
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {infiniteloader ? (
          <ActivityIndicator color="#000" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const handleLoadMore = () => {
    if (transactionData.length > 0) {
      fetchTransactionData();
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <LoadingScreen /> : null}
      <DropdownComponent
        label="City Name"
        placeholder="select"
        dropdowndata={citydata}
        onDropdownChange={handleCitySelection}
      />

      {cityInfo ? (
        <View style={styles.merchantInfoCard}>
          <Title>City Info</Title>
          <View>
            <SubTitle>
              Merchant name : {"\t"}
              {cityInfo?.merchant}
            </SubTitle>
            <SubTitle>
              Total amount of transactions done : {"\t"}
              {cityInfo?.total_amount}
            </SubTitle>
            <SubTitle>
              Total count of transsactions are : {"\t"}
              {cityInfo?.transactionCount}
            </SubTitle>
          </View>
        </View>
      ) : null}

      <FlatList
        data={transactionData}
        renderItem={(item: any) => {
          return <TransactionCard {...item.item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
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
  merchantInfoCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 2,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
