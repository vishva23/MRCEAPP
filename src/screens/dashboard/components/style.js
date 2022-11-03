import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../resources';
import {fonts} from '../../../resources/fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  flexRowView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    // fontWeight: 'bold',
    fontSize: RFValue(15),
    color: colors.black,
    fontFamily: fonts.AzoSansBold,
  },
  viewAllText: {
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(9),
    color: colors.black,
    textDecorationLine: 'underline',
  },
  iconStyle: {
    height: 17,
    width: 17,
  },
  btnStyle: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: colors.primaryPink,
    fontFamily: fonts.AzoSansBold,
  },
});
