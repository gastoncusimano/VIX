import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native-paper'
import { TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

/* STYLES */
import { style } from './index.style'
/* STYLES */

function CustomInput(props) {
  const [isSafe, setSecurity] = useState(false)
  const changeSecurity = () => setSecurity(!isSafe)

  useEffect(() => {
    (function(){
      if(props.type === "password")
        changeSecurity()
    })()
  }, [])
  return (
    <View style={[style.inputWrapper, props.styleContainer && props.styleContainer]} >
      {props.iconLeadingShown &&
        <View style={style.inputLeading} >
          <Icon 
            name={props.iconName}
            size={20} 
            color="#FFF"
            style={props.styleTrailing}
          />
        </View>
      }
      <View style={style.inputContent} >
        <Text style={style.inputName} >{props.label}</Text>
        <TextInput 
          {...props}
          style={[style.input, props.inputStyle && props.inputStyle]} 
          onChangeText={(text) => props.onChangeText(props.name, text)}
          secureTextEntry={isSafe} 
          autoCompleteType={props.type} 
          placeholderTextColor="#FFF" 
        />
      </View>
      {props.type === "password" &&
        <View style={style.inputTrailing} >
          <Icon 
            name={isSafe ? "eye" : "eye-slash"} 
            size={20} 
            color="#FFF" 
            onPress={changeSecurity}
            style={props.styleTrailing}
          />
        </View>
      }
      {props.iconTrealingShown &&
        <View style={style.inputTrailing} >
          <Icon 
            name={props.iconNameTrealing} 
            size={20} 
            color={props.iconColorTrealing} 
            onPress={changeSecurity}
            style={props.styleTrailing}
          />
        </View>
      }
    </View>
  )
}

CustomInput.defaultProps = {
  iconLeadingShown: true,
  iconNameTrealing: "#FFF",
  iconTrealingShown: false,
}

CustomInput.prototype = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconName: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  styleLeading: PropTypes.object,
  styleTrailing: PropTypes.object,
  iconLeadingShown: PropTypes.bool,
  iconNameTrealing: PropTypes.string,
  iconTrealingShown: PropTypes.bool,
}

export default CustomInput