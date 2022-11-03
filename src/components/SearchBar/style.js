import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

export default StyleSheet.create({
  textInputView: {
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.borderGrey,
  },
  textInputStyle: {
    flex: 1,
    height: 40,
    paddingRight: 10,
    fontSize: RFValue(11),
    color: colors.black,
  },
  iconStyle: {
    width: 16,
    height: 16,
    tintColor: colors.black,
  },
});
