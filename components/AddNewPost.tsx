import {View, TouchableOpacity, Text} from 'react-native';

export default function AddNewPost(props: {navigation: any}) {
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      style={{height: 50, width: 50, position: 'absolute', bottom: 0, right: 0}}
      onPress={() => props.navigation.navigate('NewPost')}>
      <Text style={{fontSize: 50, color: '#cecece'}}>+</Text>
    </TouchableOpacity>
  );
}
