import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';

export default StyleSheet.create({
  container: {
    height: 45,
    minWidth: 100,
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: RFValue(13),
    color: colors.white,
  },
});
