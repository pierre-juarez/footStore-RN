import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/index';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999
  },
  imgProduct: {
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width-44,
    top: 20
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width-10,
    top: 5
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width
  },
  rating: {
    top: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: SIZES.large
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'medium',
    paddingHorizontal: 5
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.large
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: 'semibold',
    fontSize: SIZES.large
  },
  descriptionWrapper: {
    marginTop: SIZES.large*2,
    marginHorizontal: SIZES.large
  },
  detailsWrapper: {
    marginHorizontal: SIZES.large,
    justifyContent:'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  descriptionStock: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    textAlign: 'justify',
    marginBottom: SIZES.small
  },
  description: {
    fontFamily: 'medium',
    fontSize: SIZES.large-2
  },
  descriptionText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small
  },
  locationWrapper: {
    marginBottom: SIZES.small
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large
  },
  locationItems: {
    flexDirection: 'row'
  },
  cartBtn: {
    width: SIZES.width*0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginLeft: 12,
    alignItems: 'center'
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: 'semibold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite
  },
  addCartBtn: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;