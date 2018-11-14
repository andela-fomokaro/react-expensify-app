import { login, logout } from '../../actions/auth';


test('login test', () => {
  const uid = 'this_is_a_dummy_uid'
  const action = login(uid);

  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('logout test', () => {
  const action = logout();

  expect(action).toEqual({
    type: 'LOGOUT'
  });
});