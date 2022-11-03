import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../resources';
import {fonts} from '../../resources/fonts';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.drawerColor,
  },
  headerContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  drawerItemStyle: {
    borderRadius: 0,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginVertical: 0,
    marginHorizontal: 0,
    borderLeftColor: colors.primaryPink,
  },
  labelStyle: {
    // fontWeight: 'bold',
    fontSize: RFValue(20),
    color: colors.black,
    fontFamily: fonts.AzoSansBlack,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  footer: {
    marginVertical: 10,
  },
});
