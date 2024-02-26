import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

const renderWithNavigation = (component) => {
  return render(
    <NavigationContainer>
      {component}
    </NavigationContainer>
  );
};

export default renderWithNavigation