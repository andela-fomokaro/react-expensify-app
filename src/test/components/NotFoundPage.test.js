import  React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../components/NotFound';

test('should render the NotFoundPage component', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});