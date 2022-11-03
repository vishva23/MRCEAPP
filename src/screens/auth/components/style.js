import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../resources';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  imageBackground: {
    flex: 1,
  },
  landingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainView: {
    marginTop: 100,
  },
  logoStyle: {
    height: 80,
    width: 130,
    alignSelf: 'center',
  },
  headingStyle: {
    marginTop: 20,
    fontSize: RFValue(17),
    color: colors.black,
    textAlign: 'center',
  },
  headingStyle1: {
    marginBottom: 20,
    fontSize: RFValue(20),
    color: colors.black,
    textAlign: 'center',
  },
  textStyle1: {
    marginTop: 10,
    fontSize: RFValue(12),
    color: colors.black,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  textStyle2: {
    fontSize: RFValue(14),
    color: colors.black,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  textStyle3: {
    marginBottom: 5,
    fontSize: RFValue(10),
    color: colors.black,
  },
  forgotText: {
    marginTop: 10,
    fontSize: RFValue(11),
    color: colors.black,
    textAlign: 'center',
  },
  btnStyle: {
    marginTop: 100,
  },
});
