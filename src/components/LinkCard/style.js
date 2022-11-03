import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';
import {fonts} from '../../resources/fonts';

export default StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(11),
    color: colors.black,
  },
  iconView: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
});
