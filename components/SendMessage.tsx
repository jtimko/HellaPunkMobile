import {View, Button, TextInput} from 'react-native';
import {useState} from 'react';

export default function SendMessage(props: {addComment: any}) {
    const [comment, setComment] = useState<string>('');

    function commentHandler() {
        props.addComment(comment)
        setComment("");
    }

    return (
        <View
            style={{position: 'absolute', left: 5, bottom: 5, flex: 1, flexDirection: 'row'}}>
            <TextInput
                placeholder="Comment"
                style={{
                    flex: 1,
                    flexGrow: 1,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 25,
                    marginTop: 10,
                }}
                onChangeText={text => setComment(text)}
                value={comment}
            />
            <Button title="Send" onPress={() => commentHandler()} />
        </View>
    );
}
