import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../resources';
import {fonts} from '../../../resources/fonts';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  flexRowView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowView1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrey,
  },
  mainView: {
    marginTop: 30,
  },
  contentView: {
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.borderGrey,
  },
  contentTextView1: {
    flex: 0.4,
    padding: 15,
    backgroundColor: colors.lightGrey,
  },
  contentTextView2: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },
  contentText1: {
    fontSize: RFValue(11),
    color: colors.black,
    fontWeight: 'bold',
  },
  contentText2: {
    fontSize: RFValue(11),
    color: colors.black,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: RFValue(15),
    color: colors.black,
  },
  headingText1: {
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(18),
    color: colors.black,
  },
  textStyle: {
    marginTop: 6,
    fontSize: RFValue(10),
    color: colors.black,
    textAlign: 'center',
  },
  textStyle1: {
    marginTop: 6,
    fontSize: RFValue(11),
    color: colors.textGray,
  },
  cancelText: {
    fontFamily: fonts.AzoSansBold,
    fontSize: RFValue(11),
    color: colors.black,
    textDecorationLine: 'underline',
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: RFValue(11),
    color: colors.black,
  },
  iconStyle: {
    height: 17,
    width: 17,
  },
  btnStyle: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: colors.primaryPink,
    fontFamily: fonts.AzoSansBold,
  },
  searchContainer: {
    top: -10,
    height: 40,
    width: '100%',
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: colors.white,
  },
  lineSeparator: {
    marginTop: 20,
    borderWidth: 0.2,
    borderColor: colors.darkGray,
  },
});
