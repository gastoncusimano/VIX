import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { 
  DrawerItem, 
  createDrawerNavigator, 
  DrawerContentScrollView, 
} from '@react-navigation/drawer'
import {
  Text,
  Title,
  Avatar,
  Drawer as PaperDrawer,
} from 'react-native-paper';

import actions from '../../redux/Auth/actions'
import { PRIMARY, SECONDARY } from '../../styles/colors'

/* CUSTOM COMPONENTS */
import { ProfileButton } from './index.style'
import AppTabNavigation from '../../navigations/AppTabNavigation'
/* CUSTOM COMPONENTS */

const Drawer = createDrawerNavigator()
const Styles = StyleSheet.create({
  drawerItem: {
    borderRadius: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    justifyContent: "center"
  },
  drawerItemText: {
    color: "#FFF",
    marginLeft: -20,
    paddingHorizontal: 10,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,.08)"
  }
})



const DrawerIcon = ({ color, size, name }) => (
  <Icon 
    name={name}
    size={20}
    color={"#FFF"}
    style={{ height: 20, width: 20, marginLeft: 15 }}
  />
)

function CustomDrawerContent(props) {
  return (
    <LinearGradient  colors={[PRIMARY, SECONDARY]} style={{ flex: 1, alignItems: "stretch", width: "100%" }}>
      <DrawerContentScrollView {...props}>
          <PaperDrawer.Section style={{ flex: 1, flexDirection: "row", alignItems: "center", padding: 20 }}>
            <Avatar.Image
              source={{ uri: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png" }}
              size={60}
            />
            <View style={{ marginLeft: 20 }} >
              <Title style={{ color: "#FFF", fontSize: 18 , marginBottom: 5 }} >{`${props.profile.customer?.name} ${props.profile.customer?.last_name}`}</Title>
              <ProfileButton underlayColor="rgba(255,255,255,.2)" onPress={() => props.navigation.navigate("Profile")} >
                <Text style={{ color: "#FFF" }} >Ver Perfil</Text>
              </ProfileButton>
            </View>
          </PaperDrawer.Section>
          <PaperDrawer.Section>
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-home"} />)}
              label="Inicio"
              style={Styles.drawerItem}
              labelStyle={Styles.drawerItemText}
              onPress={() => props.navigation.navigate("Home")}
            />
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-stats"} />)}
              label="Movimientos"
              style={Styles.drawerItem}
              onPress={() => props.navigation.navigate("Movimientos")}
              labelStyle={Styles.drawerItemText}
            />
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-share"} />)}
              label="Invitar Amigo"
              style={Styles.drawerItem}
              onPress={() => props.navigation.navigate("Inicio")}
              labelStyle={Styles.drawerItemText}
            />
          </PaperDrawer.Section>
          <PaperDrawer.Section >
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-settings"} />)}
              label="Preferencias"
              style={Styles.drawerItem}
              onPress={() => props.navigation.navigate("Inicio")}
              labelStyle={Styles.drawerItemText}
            />
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-help-circle"} />)}
              label="Ayuda"
              style={Styles.drawerItem}
              onPress={() => props.navigation.navigate("Inicio")}
              labelStyle={Styles.drawerItemText}
            />
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-information-circle"} />)}
              label="Terminos y Condiciones"
              style={Styles.drawerItem}
              onPress={() => props.navigation.navigate("Inicio")}
              labelStyle={Styles.drawerItemText}
            />
            <DrawerItem
              icon={(props) => (<DrawerIcon {...props} name={"md-log-out"} />)}
              label="Cerrar Sesion"
              style={Styles.drawerItem}
              onPress={() => props.logout()}
              labelStyle={Styles.drawerItemText}
            />
          </PaperDrawer.Section>
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

function SideMenu({ profile, logout }) {
  return (
    <Drawer.Navigator 
      drawerContent={props => CustomDrawerContent({profile, logout, ...props})}
      drawerStyle={{ backgroundColor: "#7898fd" }}
      drawerContentOptions={{
        itemStyle: { borderRadius: 0, marginHorizontal: 0, paddingHorizontal: 15 },
        labelStyle: { color: "#FFF", marginLeft: -15 },
        activeBackgroundColor: "rgba(255,255,255, 0.2)",
      }}
    > 
      <Drawer.Screen
        name="Inicio"
        component={AppTabNavigation}
      /> 
    </Drawer.Navigator>
  )
}

export default connect(state => ({
  profile: state.Auth.profile,
}), { logout: actions.logout })(SideMenu)