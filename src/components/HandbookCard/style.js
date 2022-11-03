import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';
import {fonts} from '../../resources/fonts';

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textStyle: {
    flex: 1,
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(11),
    color: colors.black,
  },
  lineSeparator: {
    height: 30,
    borderWidth: 0.2,
    marginRight: 15,
    borderColor: colors.darkGray,
  },
});
