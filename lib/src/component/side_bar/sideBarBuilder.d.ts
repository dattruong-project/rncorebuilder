/// <reference types="react" />
import { DrawerNavigationOptions, DrawerContentComponentProps, DrawerNavigationEventMap } from '@react-navigation/drawer';
import { DrawerStatus, EventListenerCallback } from '@react-navigation/native';
type SideBarProps = {
    initialRouteName: string;
    defaultStatus?: DrawerStatus;
    screenOptions?: DrawerNavigationOptions;
    drawerContent?: (props: DrawerContentComponentProps) => React.ReactNode;
    screenListener?: Partial<{
        drawerItemPress: EventListenerCallback<DrawerNavigationEventMap, "drawerItemPress">;
        focus: any;
        state: any;
        beforeRemove: any;
    }>;
    lsScreen: [
        {
            name: string;
            component: any;
        }
    ];
};
declare const SideBarBuilder: (props: SideBarProps) => import("react").JSX.Element;
export default SideBarBuilder;
