import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    margin: 0,
  },
  modalContainer: {
    borderRadius: 10,
    width: width - 30,
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  pickerContainer: {
    borderRadius: 5,
    width: width - 60,
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: colors.white,
  },
  modalTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  modalTitle1: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(13),
    color: colors.primaryPink,
  },
  pickerItemText: {
    fontSize: RFValue(11),
    fontWeight: '500',
    alignSelf: 'center',
    color: colors.textGray,
  },
  shareIconsContainer: {
    marginTop: 35,
    marginBottom: 45,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareIconStyle: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(20),
  },
  lineSeparator: {
    borderWidth: 0.3,
    marginVertical: 12,
    marginHorizontal: 15,
    borderColor: colors.darkGray,
  },
  modalBtnTitle: {
    fontSize: RFValue(12),
  },
  modalBtnStyle: {
    marginTop: 10,
    height: 36,
    width: width - 60,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: colors.primaryPink,
  },
});
