import { View } from 'react-native';
export const Column = (props) => {
    return <>
    <View style={{ flexDirection: 'column' }}>
       {props.children}
    </View>
    </>;
};
