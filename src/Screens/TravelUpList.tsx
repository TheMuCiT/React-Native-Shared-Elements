import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Pressable,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {useState, useRef, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import travelup from '../config/data/travelup';
import {width} from '../config/theme';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';

const IMAGE_WIDTH = width * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 4;

const TravelUpList = () => {
  const navigation = useNavigation<any>();

  const [activeIndex, setActiveIndex] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const setActiveSlide = useCallback((newIndex: any) => {
    setActiveIndex(newIndex);
    reactiveAnimated.setValue(newIndex);
  }, []);

  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (activeIndex === travelup.length - 1) {
            return;
          }
          setActiveSlide(activeIndex + 1);
        }
      }}>
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (activeIndex === 0) {
              return;
            }
            setActiveSlide(activeIndex - 1);
          }
        }}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#1e1d1d'}}>
          <StatusBar hidden />
          <FlatList
            data={travelup}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            removeClippedSubviews={false}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                {
                  zIndex: travelup.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2,
                },
              ];
              return (
                <View index={index} {...props} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = animatedValue.interpolate({
                inputRange,
                outputRange: [-30, 0, 30],
              });

              const opacity = animatedValue.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              const scale = animatedValue.interpolate({
                inputRange,
                outputRange: [0.92, 1, 1.2],
              });
              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    transform: [{translateY}, {scale}],
                    opacity,
                  }}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('TravelUpDetails', {
                        item: travelup[activeIndex],
                      });
                    }}>
                    <SharedElement
                      id={`item.${item.key}.image`}
                      style={styles.image}>
                      <Image source={{uri: item.image}} style={styles.image} />
                    </SharedElement>
                    <View style={{position: 'absolute', bottom: 20, left: 20}}>
                      <SharedElement id={`item.${item.key}.name`}>
                        <Text
                          style={styles.name}
                          numberOfLines={1}
                          adjustsFontSizeToFit>
                          {item.name}
                        </Text>
                      </SharedElement>
                    </View>
                  </Pressable>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  name: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 36,
    fontWeight: '900',
  },
});

export default TravelUpList;
