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
  headingText: {
    marginTop: 15,
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(16),
    color: colors.black,
  },
  textStyle: {
    marginTop: 12,
    fontSize: RFValue(10),
    color: colors.black,
  },
  lineSeparator: {
    marginBottom: 20,
    borderWidth: 0.2,
    borderColor: colors.darkGray,
  },
  btnStyle: {
    marginTop: 30,
    backgroundColor: colors.primaryPink,
  },
});
