import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import BackIcon from '../Components/BackIcon';
import {DATA} from '../config/travel';
import {useEffect, useRef} from 'react';
import {ICON_SIZE, SPACING, width} from '../config/theme';
import Icon from '../Components/Icon';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';

const Details = () => {
  const route = useRoute<any>();
  const {item} = route.params;
  const ref = useRef<FlatList>(null);
  const selectedItemIndex = DATA.findIndex(i => i.id === item.id);
  const navigation = useNavigation();

  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const activeIndexAnimation = useRef(
    new Animated.Value(selectedItemIndex),
  ).current;

  const animation = (toValue: number, delay: number) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  }, []);

  const size = ICON_SIZE + SPACING * 2;
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackIcon
        onPress={() => {
          animation(0, 0).start(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
          transform: [{translateX}],
        }}>
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Pressable
              style={{padding: SPACING}}
              key={item.id}
              onPress={() => {
                activeIndex.setValue(index);
                ref.current?.scrollToIndex({index, animated: true});
              }}>
              <Animated.View style={{opacity, alignItems: 'center'}}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Text style={{fontSize: 10}}>{item.title}</Text>
              </Animated.View>
            </Pressable>
          );
        })}
      </Animated.View>

      <Animated.FlatList
        style={{opacity: mountedAnimated, transform: [{translateY}]}}
        ref={ref}
        data={DATA}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          const newIndex = Math.round(ev.nativeEvent.contentOffset.x / width);

          activeIndex.setValue(newIndex);
        }}
        renderItem={({item}) => {
          return (
            <ScrollView
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 16,
              }}>
              <View style={{padding: SPACING}}>
                <Text style={{fontSize: 16}}>
                  {Array(50).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

Details.sharedElements = ({route, otherRoute, showing}: any) => {
  return DATA.map(item => `item.${item.id}.icon`);
};

export default Details;

const styles = StyleSheet.create({
  imageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//navigation.goBack()
