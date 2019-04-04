import { createBottomTabNavigator } from 'react-navigation';
import TemplateScreen from '../screens/TemplateScreen';
import HistoryScreen from '../screens/HistoryScreen';

export default createBottomTabNavigator({
  Templates: TemplateScreen,
  History: HistoryScreen,
},
{
  tabBarOptions: {
    labelStyle: {
      fontSize: 24,
    },
  },
});
