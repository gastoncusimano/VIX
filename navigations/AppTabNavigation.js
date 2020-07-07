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
import Help from '../scenes/Help'
import Terms from '../scenes/Terms'
import Camera from '../scenes/Camera'
import InsertCard from '../scenes/InsertCard'
import CashInStack from "./CashInStack";
import PaymentStack from "./PaymentStack";
import CardsStack from "./CardsStack";
import ProfileStack from "./ProfileStack";
import ActivitiesStack from "./ActivitiesStack";
import TransferenceStack from "./TransferStack";
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
          <Text style={styles.circleTextAvatar}>{`${!_.isEmpty(profile.customer.first_name) ? profile.customer.first_name.charAt(0)
            .toUpperCase() : ""}${!_.isEmpty(profile.customer.last_name) ? profile.customer.last_name.charAt(0).toUpperCase() : "" }`}</Text>
        </View>
        <View style={styles.welcomeText}>
          <Text style={{ color: "white", fontSize: 22 }}>
            Hola{"\n"}
            <Text
              style={{ fontWeight: "bold", color: '#ffac00' }}
            >{`${profile.customer?.first_name} ${profile.customer?.last_name}`}</Text>
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
        name="TransferenceStack"
        component={TransferenceStack}
        options={{ title: "" }}
      />
      <Stack.Screen name="Help" component={Help}/>
      <Stack.Screen name="Terms" component={Terms}/>
      <Stack.Screen name="Camera" component={Camera}/>
      <Stack.Screen name="InsertCard" component={InsertCard}/>
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
        name="Cards"
        component={CardsStack}
        title=""
        options={{ headerTitle: "Cards" }}
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
    <HomeNavigation/>
  );
}

export default withTheme(App);
