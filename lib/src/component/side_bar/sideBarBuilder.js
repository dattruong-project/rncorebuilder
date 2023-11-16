import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
const SideBarBuilder = (props) => {
    return ((<NavigationContainer independent={true}>
        <Drawer.Navigator {...props}>
          {props.lsScreen.map((screen) => <Drawer.Screen key={screen.name} name={screen.name} component={screen.component}></Drawer.Screen>)}
        </Drawer.Navigator>
      </NavigationContainer>));
};
export default SideBarBuilder;
