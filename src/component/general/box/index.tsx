import { DimensionValue, View } from "react-native"

type Props = {
 dimen?: DimensionValue
}

export const VerticalBox = (prop: Props) => {
    return <View style ={{height: prop.dimen}}/>
}

export const HorizontalBox = (prop: Props) => {
    return <View style = {{ width: prop.dimen}}/>
}