import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.darkGray,
  },
  textStyle: {
    fontSize: RFValue(10),
    color: colors.textGray,
  },
  iconStyle: {
    width: 11,
    height: 11,
    marginRight: 8,
    tintColor: colors.textGray,
  },
});
