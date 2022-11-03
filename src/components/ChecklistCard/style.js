import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';
import {fonts} from '../../resources/fonts';

export default StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  mainView: {
    flex: 1,
    // marginLeft: 8,
  },
  subView: {
    flex: 1,
    marginTop: 1,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: colors.greish,
  },
  imageStyle: {
    width: 70,
    height: 70,
    borderRadius: 3,
    backgroundColor: colors.greish,
  },
  textStyle: {
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(11),
    color: colors.black,
    marginVertical: 2,
  },
  statusTextView: {
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 9,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: RFValue(9),
    color: colors.textGray,
    textTransform: 'capitalize',
    fontFamily: fonts.AzoSansMedium,
  },
  incidenceDetailsText: {
    fontSize: RFValue(8),
    color: colors.textGray,
    textTransform: 'capitalize',
    fontFamily: fonts.AzoSansRegular,
  },

  dateText: {
    fontSize: RFValue(8),
    color: colors.iconGrey,
    fontFamily: fonts.AzoSansMedium,
  },
});
