import {View} from 'react-native';

export type ColumnProps = {
    children: React.ReactNode;
  };

export const Column = (props: ColumnProps) =>  {
    return <>
    <View style = {{flexDirection: 'column'}}>
       {props.children}
    </View>
    </>
}
