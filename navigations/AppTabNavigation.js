import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, withTheme } from "react-native-paper";
import Home from "../scenes/HomePage";
import * as _ from 'lodash'
import CashInStack from "./CashInStack";
import ActivitiesStack from "./ActivitiesStack";
import TransferenceStack from "./TransferStack";
import PaymentStack from "./PaymentStack";
import ProfileStack from "./ProfileStack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons'; 
/* STYLES */
import { styles } from "./index.style";
/* STYLES */

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HeaderScreen = ({ scene, navigation, previous, profile }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return options.title === "Gollet" ? (
    <LinearGradient
      colors={["#00315f", "#004e97"]}
      start={[0, 0.5]}
      end={[0.8, 1]}
      style={{
        left: 0,
        right: 0,
        top: 0,
        elevation: 3,
        paddingBottom: 5,
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: "#00000000",
          height: 120,
          zIndex: 1,
          paddingTop: 35,
        }}
      >
        <View style={styles.circleAvatar}>
          <Text style={styles.circleTextAvatar}>{`${!_.isEmpty(profile.customer.name) ? profile.customer.name.charAt(0)
            .toUpperCase() : ""}${!_.isEmpty(profile.customer.last_name) ? profile.customer.last_name.charAt(0).toUpperCase() : "" }`}</Text>
        </View>
        <View style={styles.welcomeText}>
          <Text style={{ color: "white", fontSize: 22 }}>
            Bienvenido{"\n"}
            <Text
              style={{ fontWeight: "bold", color: '#ffac00' }}
            >{`${profile.customer?.name} ${profile.customer?.last_name}`}</Text>
          </Text>
        </View>
        <View style={styles.circleBell}>
          <Feather name="menu" size={32} color="white" />
        </View>
      </View>
    </LinearGradient>
  ) : null;
};

const VisibleHeaderScreen = connect((state) => ({
  profile: state.Auth.profile,
}))(HeaderScreen);

function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{ header: (props) => <VisibleHeaderScreen {...props} /> }}
      headerMode="screen"
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "Gollet" }}
      />
      <Stack.Screen
        name="Movimientos"
        component={ActivitiesStack}
        title=""
        options={{ headerTitle: "Activities" }}
      />
      <Stack.Screen
        name="CashIn"
        component={CashInStack}
        title=""
        options={{ headerTitle: "CashIn" }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentStack}
        title=""
        options={{ headerTitle: "CashIn" }}
      />
      <Stack.Screen
        name="Transference"
        component={TransferenceStack}
        title=""
        options={{ headerTitle: "CashIn" }}
      />
    </Stack.Navigator>
  );
}

function ProfileNavigation() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Profile"
        component={Profile}
        title=""
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = focused
              ? require("../assets/icons/tab/home_active.png")
              : require("../assets/icons/tab/home.png");
          } else if (route.name === "CashIn") {
            iconSource = focused
              ? require("../assets/icons/tab/cargar_dinero_active.png")
              : require("../assets/icons/tab/cargar_dinero_menu.png");
          } else if (route.name === "Transfer") {
            iconSource = focused
              ? require("../assets/icons/tab/transferir_active.png")
              : require("../assets/icons/tab/transferir_menu.png");
          } else if (route.name === "Profile") {
            iconSource = focused
              ? require("../assets/icons/tab/user_active.png")
              : require("../assets/icons/tab/user.png");
          }

          return <Image source={iconSource} />;
        },
        tabBarVisible: route.name === "Scanner" ? false : true,
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "#BEBEBE",
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#fff",
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          borderTopColor: "#fff",
          backgroundColor: "#fff",
          paddingBottom: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Transfer" component={TransferenceStack} />
      <Tab.Screen name="CashIn" component={CashInStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default withTheme(App);
