import { Dimensions, PixelRatio } from 'react-native'

export const WINDOW_WIDTH = Dimensions.get('window').width
const guidelineBaseWidth = 375

export const scaleFont = size => size * PixelRatio.getFontScale()
export const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {}

  styles[`${property}Top`] = top
  styles[`${property}Right`] = right
  styles[`${property}Bottom`] = bottom
  styles[`${property}Left`] = left

  return styles
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin')
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding')
}

export function boxShadow(color, offset = { height: 2, width: 2 }, radius = 8, opacity = 0.2) {
  return {
    elevation: radius,
    shadowColor: color,
    shadowRadius: radius,
    shadowOffset: offset,
    shadowOpacity: opacity,
  }
}