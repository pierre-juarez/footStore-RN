import { View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from '../../constants'

const slides = [
  'https://cdn0.ecologiaverde.com/es/posts/5/5/0/diferencia_entre_lago_y_laguna_1055_600.jpg',
  'https://cdn0.ecologiaverde.com/es/posts/5/5/0/diferencia_entre_lago_y_laguna_1055_600.jpg',
  'https://cdn0.ecologiaverde.com/es/posts/5/5/0/diferencia_entre_lago_y_laguna_1055_600.jpg'
]

const Carousel = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{ borderRadius: 15, width: '92%', marginTop: 15 }}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel