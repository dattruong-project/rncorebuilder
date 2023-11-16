import {DimensionValue, View} from 'react-native';

export type RowProps = {
    children: React.ReactNode;
    maxWidth?: DimensionValue
  };

export const Row = (props: RowProps) =>  {
    return <>
    <View style = {{flexDirection: 'row',maxWidth: props.maxWidth}}>
       {props.children}
    </View>
    </>
}
