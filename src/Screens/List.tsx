import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MarketingSlider from '../Components/MarketingSlider';
import {DATA} from '../config/travel';
import Icon from '../Components/Icon';
import {SPACING} from '../config/theme';
import SharedElement from 'react-navigation-shared-element/build/SharedElement';

const List = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{flex: 1}}>
      <MarketingSlider />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        {DATA.map(item => {
          return (
            <Pressable
              key={item.id}
              style={{padding: SPACING}}
              onPress={() => {
                navigation.navigate('Details', {item});
              }}>
              <SharedElement id={`item.${item.id}.icon`}>
                <Icon uri={item.imageUri} />
              </SharedElement>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default List;
