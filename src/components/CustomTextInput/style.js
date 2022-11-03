import {Platform, StyleSheet} from 'react-native';
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
  textArea: {
    flex: 1,
    height: 160,
    paddingRight: 10,
    fontSize: RFValue(11),
    textAlignVertical: 'top',
    color: colors.black,
    marginVertical: Platform.OS === 'ios' ? 15 : 0,
  },
  iconStyle: {
    height: 17,
    width: 17,
    tintColor: colors.iconGrey,
  },
  labelStyle: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: RFValue(10),
    color: colors.black,
  },
  flexRow: {
    flexDirection: 'row',
  },
  maxLengthCounter: {
    fontSize: RFValue(10),
    color: colors.gray,
  },
});
