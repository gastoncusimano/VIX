import _ from 'lodash'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Title, withTheme } from 'react-native-paper'

/* ASSETS && OWN COMPONENT */
import ActionItem from '../../components/ActionItem'
import ContentCard from '../../components/ContentCard'
import { Container } from './index.style'
import { PRIMARY, SECONDARY } from '../../styles/colors'
/* ASSETS && OWN COMPONENT END */

function CashIn({ route, navigation, theme }) {
  const navigationToView = (path, props) => navigation.push(path, { ...props })
  const handleNavigate = _.debounce(navigationToView, 180)
  
  return(
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '20%' }} title="Cargar Dinero" />
          <Appbar.Action icon="alert-circle-outline" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
        <Container style={{paddingTop: 20}}>
          <Title style={{ color: theme.colors.darkText, fontSize: 20, lineHeight: 32 }} >Medios de Pago</Title>
          <ContentCard title="Medios de Pago:" footerShown={false} headerShown={false} >
            {[{
              title: "Efectivo",
              iconName: "money-bill",
              subtitle: "Se acredita en hasta 1 día habil",
              onPress: () => handleNavigate("Cash", { handleNavigate })
            },{ 
              title: "Transferencia Bancaria",
              subtitle: "Se acredita en minutos",
              iconName: "landmark",
              onPress: () => handleNavigate("Transfer", { handleNavigate })
            }].map((data,i) => <ActionItem key={i} i={i} {...data} />)}
          </ContentCard>
        </Container>
      </LinearGradient>
    </>
  )
}

export default withTheme(CashIn)