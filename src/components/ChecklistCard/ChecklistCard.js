import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {colors, images} from '../../resources';
import styles from './style';

export default function ChecklistCard(props) {
  const {item, onPress} = props;

  const checkStatus = status => {
    if (status?.toLowerCase() === 'pending') {
      return colors.lightYellow;
    } else if (status?.toLowerCase() === 'submitted') {
      return colors.green;
    } else {
      return colors.darkGray;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={onPress}>
      {/* <View style={styles.imageStyle} /> */}

      <View style={styles.mainView}>
        <View
          style={[
            styles.statusTextView,
            {backgroundColor: checkStatus(item.incidence_status)},
          ]}>
          <Text style={styles.statusText}>{item.incidence_status}</Text>
        </View>
        {item.pdf_path != null &&
        item.incidence_status?.toLowerCase() === 'submitted' ? (
          <Image
            source={images.pdf}
            style={{
              height: 15,
              width: 15,
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
        ) : item.incidence_status?.toLowerCase() == 'draft' ||
          item.incidence_status?.toLowerCase() == 'pending' ? null : (
          <ActivityIndicator
            size={15}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          />
        )}

        <Text numberOfLines={1} style={styles.textStyle}>
          {item?.incidence_status == 'pending'
            ? item?.sub_category_title || ''
            : item?.subcategory?.sub_category_title || ''}
          {/* {item?.subcategory?.sub_category_title || ''} */}
        </Text>

        <View style={styles.subView}>
          <Text
            numberOfLines={1}
            style={[styles.statusText, {color: colors.black}]}>
            {item.incidence_title}
          </Text>

          <Text numberOfLines={1} style={styles.dateText}>
            {moment(item.updated_at).format('HH:mm')} (GMT){' '}
            {moment(item.updated_at).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
