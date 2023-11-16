import { View } from 'react-native';
export const Row = (props) => {
    return <>
    <View style={{ flexDirection: 'row', maxWidth: props.maxWidth }}>
       {props.children}
    </View>
    </>;
};
