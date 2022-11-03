import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../resources';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  headingText: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: RFValue(18),
    color: colors.black,
  },
  textStyle: {
    marginTop: 5,
    fontSize: RFValue(13),
    color: colors.textGray,
  },
  imageStyle: {
    width: 90,
    height: 90,
    tintColor: colors.lightGreen,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    marginTop: 40,
    width: '65%',
  },
});
