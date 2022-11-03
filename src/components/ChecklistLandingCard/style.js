import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionView: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  textStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: RFValue(12),
    color: colors.black,
  },
  optionLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: RFValue(11),
    color: colors.black,
  },
  lineSeparator: {
    height: 30,
    borderWidth: 0.2,
    marginHorizontal: 15,
    borderColor: colors.darkGray,
  },
  horizontallineSeparator: {
    marginVertical: 10,
    borderWidth: 0.2,
    borderColor: colors.darkGray,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  radioOutter: {
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.iconGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.green,
  },
});
