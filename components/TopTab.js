// import * as React from "react";
// import { View, useWindowDimensions, FlatList } from "react-native";
// import { TabView, SceneMap } from "react-native-tab-view";
// import { OrderItem } from "./OrderItem";
const orders = [
  {
    _id: "60a5ecdd98cf780015b07baaf",
    item: {
      confirmed: true,
      _id: "60a5ecdd98cf780015b07baaf",
      typeId: 2,
      name: "Soda bạc hà6",
      unitPrice: 20001,
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
      discountOff: 5,
      description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
      discountMaximum: 5000,
      createAt: "2021-05-20T05:00:13.401Z",
      __v: 0,
      numOfFeedbacks: 1,
      numOfStars: 5,
      quantity: 2,
    },
  },
  {
    _id: "wwww",
    item: {
      confirmed: true,
      _id: "wwww",
      typeId: 2,
      name: "Soda bạc hà6",
      unitPrice: 20001,
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
      discountOff: 5,
      description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
      discountMaximum: 5000,
      createAt: "2021-05-20T05:00:13.401Z",
      __v: 0,
      numOfFeedbacks: 1,
      numOfStars: 5,
      quantity: 2,
    },
  },
  {
    _id: "60a5ecdd98cf780tyyty015b07baaf",
    item: {
      confirmed: true,
      _id: "60a5ecdd98cf780tyyty015b07baaf",
      typeId: 2,
      name: "Soda bạc hà6",
      unitPrice: 20001,
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
      discountOff: 5,
      description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
      discountMaximum: 5000,
      createAt: "2021-05-20T05:00:13.401Z",
      __v: 0,
      numOfFeedbacks: 1,
      numOfStars: 5,
      quantity: 2,
    },
  },
];
// const FirstRoute = () => (
//   <FlatList
//     data={orders}
//     renderItem={({ order }) => <OrderItem item={order}></OrderItem>}
//     keyExtractor={(order) => `${order._id}`}
//   ></FlatList>
// );

// const SecondRoute = () => (
//   <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

// export const TopTab = () => {
//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: "first", title: "First" },
//     { key: "second", title: "Second" },
//   ]);

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//       //   renderTabBar={}
//     />
//   );
// };
import * as React from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { vw } from "../ultils";
import { OrderItem } from "./OrderItem";

const FirstRoute = (navigation) => {
  return (
    <FlatList
      data={orders}
      renderItem={({ order }) => (
        <OrderItem item={order} navigation={navigation}></OrderItem>
      )}
      keyExtractor={(order) => `${order._id}`}
    ></FlatList>
  );
};
const SecondRoute = (navigation) => (
  <View style={[styles.container, { backgroundColor: "#673ab7" }]} />
);

export default class TabViewExample extends React.Component {
  navigation = this.props.navigation;

  state = {
    index: 0,
    routes: [
      { key: "-1", title: "Tất cả" },
      { key: "0", title: "Đang xác nhận" },
      { key: "1", title: "Đang chuẩn bị" },
      { key: "2", title: "Hoàn thành" },
    ],
  };

  _handleIndexChange = (index) => this.setState({ index });

  _renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
      >
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const borderWith = props.navigationState.index === i ? 5 : 0;
          return (
            <TouchableOpacity
              key={`${i}`}
              style={[
                styles.tabItem,
                {
                  borderBottomWidth: borderWith,
                  borderBottomColor: "#e83e52",
                  height: 50,
                },
              ]}
              onPress={() => this.setState({ index: i })}
            >
              <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  _renderScene = SceneMap({
    "-1": () => FirstRoute(this.navigation),
    0: SecondRoute,
    1: FirstRoute,
    2: SecondRoute,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    maxHeight: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
});
