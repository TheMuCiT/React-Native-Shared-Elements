import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable, StyleSheet, Image, Animated} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import data from '../config/data/locations';
import {tutorial2Spec} from '../config/theme';
import {useRef} from 'react';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';

const {ITEM_WIDTH, ITEM_HEIGHT, FULL_SIZE, SPACING, RADIUS} = tutorial2Spec;

const TravelList = () => {
  const navigation = useNavigation<any>();

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('TravelListDetails', {item});
              }}
              style={styles.itemContainer}>
              <SharedElement
                id={`item.${item.key}.photo`}
                style={[StyleSheet.absoluteFillObject]}>
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {overflow: 'hidden', borderRadius: RADIUS},
                  ]}>
                  <Animated.Image
                    source={{uri: item.image}}
                    style={[
                      StyleSheet.absoluteFillObject,
                      {resizeMode: 'cover', transform: [{scale}]},
                    ]}
                  />
                </View>
              </SharedElement>
              <SharedElement id={`item.${item.key}.location`}>
                <Animated.Text
                  style={[styles.location, {transform: [{translateX}]}]}>
                  {item.location}
                </Animated.Text>
              </SharedElement>
              <View style={styles.days}>
                <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                <Text style={styles.daysLabel}>days</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING * 2,
    left: SPACING * 2,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysValue: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 18,
  },
  daysLabel: {
    color: '#fff',
    fontSize: 10,
  },
});

export default TravelList;
