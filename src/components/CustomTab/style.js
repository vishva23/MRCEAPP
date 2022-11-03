import {StyleSheet, Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

const width = Dimensions.get('window').width / 3 - 20;

export default StyleSheet.create({
  container: {
    width: width,
    height: 60,
    padding: 8,
    borderRadius: 5,
    borderColor: colors.darkGray,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  textStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: RFValue(15),
    color: colors.black,
  },
  labelStyle: {
    fontSize: RFValue(9),
    color: colors.black,
  },
  flexRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    width: 16,
    height: 16,
    marginTop: -5,
  },
});
