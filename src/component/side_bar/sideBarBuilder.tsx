import { createDrawerNavigator, DrawerNavigationOptions, DrawerContentComponentProps, DrawerNavigationEventMap } from '@react-navigation/drawer';
import { NavigationContainer, DrawerStatus, EventListenerCallback } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

type SideBarProps = {
  initialRouteName: string,
  defaultStatus?: DrawerStatus,
  screenOptions?: DrawerNavigationOptions,
  drawerContent?: (props: DrawerContentComponentProps) => React.ReactNode,
  screenListener?: Partial<{
    drawerItemPress: EventListenerCallback<DrawerNavigationEventMap, "drawerItemPress">,
    focus: any,
    state: any,
    beforeRemove: any
  }>,
  lsScreen: [
    {
      name: string,
      component: any
    }
  ]
};

const SideBarBuilder = (props: SideBarProps) => {
  return (
    (
      <NavigationContainer independent = {true}>
        <Drawer.Navigator
          {...props}>
          {props.lsScreen.map((screen) => <Drawer.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}></Drawer.Screen>)}
        </Drawer.Navigator>
      </NavigationContainer>
    )
  );
}

export default SideBarBuilder;

