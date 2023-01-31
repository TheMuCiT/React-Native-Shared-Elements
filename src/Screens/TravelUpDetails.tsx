import {View, Text, Image, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {avatars} from '../config/data/travelup';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {height, width} from '../config/theme';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';
import * as Animatable from 'react-native-animatable';
import React, {useRef} from 'react';

const Height = () => {
  return (
    <View>
      <Text style={styles.heading}>Height</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={styles.number}>
          {Math.floor(Math.random() * 2200) + 1000}
        </Text>
        <Text style={styles.numberType}>m</Text>
      </View>
    </View>
  );
};

const Distance = () => {
  return (
    <View>
      <Text style={styles.heading}>Distance</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={styles.number}>{Math.floor(Math.random() * 40) + 20}</Text>
        <Text style={styles.numberType}>km</Text>
      </View>
    </View>
  );
};

const Avatars = () => {
  return (
    <View>
      <Text style={styles.heading}>Your team</Text>
      <View style={{flexDirection: 'row'}}>
        {avatars.map((uri, index) => {
          return (
            <Image
              source={{uri}}
              key={index}
              style={[
                styles.avatar,
                {
                  zIndex: avatars.length - index,
                  marginLeft: index === 0 ? 0 : -20,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};
const TravelUpDetails = () => {
  const route = useRoute<any>();
  const {item} = route.params;

  const topRef = useRef<any>(null);
  const bottomRef = useRef<any>(null);

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#1e1d1d'}}>
      <SharedElement id={`item.${item.key}.image`} style={styles.image}>
        <Image source={{uri: item.image}} style={styles.image} />
      </SharedElement>
      <Animatable.View
        ref={topRef}
        animation={'fadeIn'}
        duration={800}
        delay={600}
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'rgba(0,0,0,0.3)'},
        ]}>
        <AntDesign
          name="arrowleft"
          size={24}
          style={{
            padding: 12,
            position: 'absolute',
            top: 30,
            left: 20,
            zIndex: 2,
          }}
          color="#fff"
          onPress={() => {
            Promise.all([
              topRef?.current?.fadeOut(300),
              bottomRef?.current?.fadeOut(300),
            ]).then(() => {
              navigation.goBack();
            });
          }}
        />
        <LinearGradient
          colors={['transparent', '#000', '#000']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height / 2,
          }}
        />
      </Animatable.View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 70,
          justifyContent: 'flex-end',
        }}>
        <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
          <SharedElement id={`item.${item.key}.name`}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
              {item.name}
            </Text>
          </SharedElement>
        </View>
        <Animatable.View
          ref={bottomRef}
          animation={'fadeIn'}
          duration={800}
          delay={700}
          style={{
            width,
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <Avatars />
          <Distance />
          <Height />
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#000',
  },
  heading: {
    color: '#fff',
    fontWeight: '300',
    marginBottom: 8,
  },
  number: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
    marginRight: 2,
    marginBottom: -5,
  },
  numberType: {
    color: '#fff',
    fontSize: 12,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: 62,
    fontWeight: '900',
  },
});

TravelUpDetails.sharedElements = ({route, otherRoute, showing}: any) => {
  const {item} = route.params;

  return [{id: `item.${item.key}.image`}, {id: `item.${item.key}.name`}];
};

export default TravelUpDetails;
