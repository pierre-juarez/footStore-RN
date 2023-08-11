import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../../constants"

COLORS
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    height: '100%'
  },
  wrapper: {
    marginHorizontal: 10
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    marginLeft: SIZES.xxLarge,
    marginTop: 8,
    
  },
  resumeWrapper: {
    marginTop: 30,
    marginHorizontal: 15
  },
  titleResume: {
    fontFamily: 'bold',
    fontSize: SIZES.large
  },
  detailResumeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  detailResume: {
    fontFamily: 'medium',
    fontSize: SIZES.large
  }
})

export default styles