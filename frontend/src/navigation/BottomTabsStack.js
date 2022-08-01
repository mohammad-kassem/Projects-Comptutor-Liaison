import React, { cloneElement } from 'react'
import { createBottomTabNavigator }  from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import { useRooms } from '../Context/Rooms';




export default function BottomTabsStack() {
	const {unreadRooms} = useRooms()
    const Tab = createBottomTabNavigator();
    return (
		<Tab.Navigator
		screenOptions={{
			tabBarActiveTintColor: '#4FC7E6',
		  }}>
			<Tab.Screen options={{
			tabBarIcon: ({ color }) => {
				return <Icon name="home" size={24} color={color}/>;
			},
			tabBarShowLabel: false,
			tabBarStyle: { height: 56 },
			headerShown: false
			}} name="Home" component={HomeScreen} />
			<Tab.Screen options={{
			tabBarIcon: ({ color }) => {
				return <Icon name="calendar" size={24} color={color}/>;
			},
			tabBarShowLabel: false,
			tabBarStyle: { height: 56 },
			headerShown: false
			}} name="Appointments" component={AppointmentsScreen} />
			<Tab.Screen options={{
			tabBarIcon: ({ color }) => {
				return <Icon name="chat" size={24} color={color}/>;
			},
			tabBarBadge: unreadRooms,
			tabBarBadgeStyle: {
				minWidth: 14,
            	maxHeight: 14,
            	borderRadius: 7,
            	fontSize: 10,
           	 	lineHeight: 13,
            	alignSelf: undefined,
		   },
			tabBarShowLabel: false,
			tabBarStyle: { height: 56 },
			headerShown: false
			}} name="Chat" component={ChatRoomsScreen} />
			<Tab.Screen options={{
			tabBarIcon: ({ color }) => {
				return <Icon name="account" size={24} color={color}/>;
			},
			tabBarShowLabel: false,
			tabBarStyle: { height: 56 },
			headerShown: false
			}} name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
      );
}