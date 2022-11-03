import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {images} from '../../resources';
import styles from './style';

export default function ChecklistLandingCard(props) {
  const {
    item,
    index,
    selectedTabIndex,
    onPressTab,
    selectedOption,
    setSelectedOption,
    onClickChecklistCategory,
    openHandbook,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.flexRowView}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={0.6}
          onPress={onPressTab}>
          <Text style={styles.textStyle}>{item.category_title}</Text>
        </TouchableOpacity>

        <View style={styles.lineSeparator} />

        <TouchableOpacity onPress={() => openHandbook(item)}>
          <Image
            resizeMode="contain"
            source={images.book}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>

      {selectedTabIndex === index && (
        <>
          <View style={styles.horizontallineSeparator} />

          {item.subcategories.map((option, ind) => (
            <TouchableOpacity
              key={ind}
              activeOpacity={0.5}
              style={styles.optionView}
              onPress={() => {
                setSelectedOption(option.sub_category_title);
                onClickChecklistCategory({
                  ...option,
                  category_id: item.category_id,
                  category_title: item.category_title,
                });
              }}>
              <View style={styles.radioOutter}>
                {selectedOption === option.sub_category_title ? (
                  <View style={styles.radioInner} />
                ) : null}
              </View>

              <Text style={styles.optionLabel}>
                {option.sub_category_title}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}
