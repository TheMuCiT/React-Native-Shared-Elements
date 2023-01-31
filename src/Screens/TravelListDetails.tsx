import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {tutorial2Spec, width} from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';

import * as Animatable from 'react-native-animatable';
import {FlatList} from 'react-native-gesture-handler';

const {ITEM_WIDTH, ITEM_HEIGHT, FULL_SIZE, SPACING, RADIUS} = tutorial2Spec;

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const TravelListDetails = () => {
  const route = useRoute<any>();
  const {item} = route.params;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <AntDesign
        name="arrowleft"
        size={24}
        style={{
          paddingHorizontal: SPACING,
          position: 'absolute',
          top: 30,
          left: 10,
          zIndex: 2,
        }}
        color="#fff"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject, {borderRadius: 0}]}>
          <Image
            source={{uri: item.image}}
            style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
          />
        </View>
      </SharedElement>

      <SharedElement id={`item.${item.key}.location`}>
        <Text style={[styles.location]}>{item.location}</Text>
      </SharedElement>
      <View
        style={{
          position: 'absolute',
          bottom: 120,
          left: SPACING,
          right: SPACING,
        }}>
        <Text
          style={{
            fontSize: 16,
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: '800',
            color: '#fff',
            marginHorizontal: SPACING,
          }}>
          Activities
        </Text>
        <FlatList
          data={[...Array(8).keys()]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: SPACING}}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation={zoomIn}
                duration={700}
                delay={400 + index * 100}
                style={{
                  backgroundColor: 'white',
                  padding: SPACING,
                  width: width * 0.33,
                  height: width * 0.5,
                  marginRight: SPACING,
                }}>
                <Image
                  source={{
                    uri: 'https://miro.medium.com/max/124/1*qYUvh-EtES8dtgKiBRiLsA.png',
                  }}
                  style={{width: '100%', height: '70%', resizeMode: 'cover'}}
                />
                <Text style={{}}>Activity #{item + 1}</Text>
              </Animatable.View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 80,
    left: SPACING * 2,
  },
});

TravelListDetails.sharedElements = ({route, otherRoute, showing}: any) => {
  const {item} = route.params;

  return [{id: `item.${item.key}.photo`}, {id: `item.${item.key}.location`}];
};

export default TravelListDetails;
