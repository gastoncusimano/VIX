import _ from 'lodash'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState, useEffect } from 'react'
import { Appbar, TouchableRipple, Title, Text, withTheme, Button } from 'react-native-paper'

/* STYLES - ACTIONS - OWN COMPONENTS */
import actions from '../../../redux/Activities/actions'
import { Container, styles } from './index.style'
import { PRIMARY_DARK, PRIMARY_LIGHT} from '../../../styles/colors'
/* STYLES - ACTIONS - OWN COMPONENTS END*/


const FilterItem = ({ name, selection, colors, navigation }) => (
  <TouchableRipple
    style={{ borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,.15)" }}
    onPress={navigation}
    rippleColor="rgba(0,0,0,.15)"
  >
    <View style={styles.filterItem} >
      <Title style={{ color: colors.darkText, textTransform: "capitalize", fontSize: 16 }} >{name}</Title>
      <Text style={{ color: colors.subtitleText, textTransform: "capitalize" }} >{selection.name}</Text>
    </View>
  </TouchableRipple>
)

const defaultFilters = {
  periodo: { id: 6, name: "Último Año" },
  estados: { id: 1, name: "Todos los estados" },
  operaciones: { id: 1, name: "Todas las operaciones" },
}

const FilterScene = ({ 
  navigation, 
  applyFilters,
  cleanFilters,
  theme: { colors },
  ...props
}) => {
  const [currentFilter, setCurrentFilter] = useState(defaultFilters)
  const [filters, setFilters] = useState({
    periodo: [{ 
      id: 1, name: "Hoy" 
    },{ 
      id: 2, name: "Ayer" 
    },{ 
      id: 3, name: "Última semana" 
    },{ 
      id: 4, name: "Últimos 15 días" 
    },{
      id: 5, name: "Último mes"
    }, {
      id: 6, name: "Último Año"
    }],
    estados: [{ 
      id: 1, name: "Todos los estados" 
    },{
      id: 2, name: "Pagos"
    },{
      id: 3, name: "Ingresos de dinero"
    },{
      id: 4, name: "Retiros de dinero"
    }],
    operaciones: [{ 
      id: 1, name: "Todas las operaciones" 
    }, {
      id: 2, name: "Pagos"
    },{
      id: 3, name: "Ingresos de dinero"
    },{
      id: 4, name: "Retiros de dinero"
    }],
  })

  const _handleFilters = (filterName, value) => {
    setCurrentFilter({ ...currentFilter, [filterName]: value })
  }

  const goBack = (callBack, props) => {
    if(props) callBack(props)
    else callBack()

    navigation.goBack()
  }

  const renderItem = () => {
    let components = []

    for (const key in filters) {
      components.push(
        <FilterItem 
          key={key}
          name={key}
          colors={colors}
          selection={props.hasFilters ? props.currentFilter[key] : currentFilter[key]}
          navigation={() => 
            navigation.push("Options", { 
              options: filters[key],
              currentFilter: currentFilter[key],
              _handleFilters: (value) => _handleFilters(key, value) 
            })}
        />
      )
    }
    return components
  }

  useEffect(() => {
    setCurrentFilter({ ...props.currentFilter })
    props.hasFilterChange()
  }, [props.hasFilters])

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Filtros" subtitle="Movimientos" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={{ flex: 1 }}
      >
        <View style={styles.contentWrapper}>
          <Container>
            <View>{renderItem()}</View>
          </Container>
          <View style={styles.container} >
            <Button 
              mode="contained"
              theme={{ colors: { primary: colors.accent } }} 
              style={{ width: "100%", marginBottom: 10 }} 
              onPress={() => goBack(applyFilters, currentFilter)}
              disabled={_.isEqual(currentFilter, props.currentFilter)}
              labelStyle={{ color: colors.text }}
            >Aplicar filtros</Button>
            <Button 
              mode="outlined" 
              theme={{ colors: { primary: colors.accent } }} 
              style={{ width: "100%" }} 
              disabled={!props.hasFilters}
              onPress={() => goBack(cleanFilters)}
            >Limpiar filtros</Button>
          </View>
        </View>
      </LinearGradient>
    </>
  )
}

export default connect( state => ({
  hasFilters: state.Activities.hasFilters,
  currentFilter: state.Activities.filters,
}), {
  applyFilters: actions.applyFilters, 
  cleanFilters: actions.cleanFilters,
  hasFilterChange: actions.hasFilterChange,
})(withTheme(FilterScene))
