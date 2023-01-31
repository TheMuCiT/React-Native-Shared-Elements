import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BackIcon = ({onPress}) => {
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      style={{padding: 12, zIndex: 2}}
      color="#333"
      onPress={onPress}
    />
  );
};

export default BackIcon;
