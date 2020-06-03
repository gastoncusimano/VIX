import React, { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

/* OWN COMPONENTS */
import RootNavigation from './RootNavigation'
/* OWN COMPONENTS END */

const PublicRoutes = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  )
}

export default PublicRoutes