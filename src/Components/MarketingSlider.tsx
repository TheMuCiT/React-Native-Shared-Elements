import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {SLIDER_DATA} from '../config/travel';
import {ITEM_WIDTH, width, SPACING} from '../config/theme';

const MarketingSlider = () => {
  return (
    <FlatList
      data={SLIDER_DATA}
      horizontal
      snapToInterval={ITEM_WIDTH + SPACING * 2}
      contentContainerStyle={{paddingRight: width - ITEM_WIDTH - SPACING * 2}}
      decelerationRate={'fast'}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        );
      }}
    />
  );
};

export default MarketingSlider;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    margin: SPACING,
  },
  itemText: {},
});
