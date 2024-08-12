import { NavigationProp, ParamListBase } from "@react-navigation/native";
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'roles'>;
export interface NavigationType {
    navigation?: NavigationProp<NavigationState>
    navigate?: ProfileScreenRouteProp
    openDrawer?: NavigationProp<NavigationState>
}
// types.ts
export interface ProfileState {
    profileData: {
        name?: string;
        email?: string;
        username?: string;
    } | null;
    loading: boolean;
    error: string | null;
}

export interface FetchUserProfileResponse {
    name: string;
    email: string;
    username: string;
}
