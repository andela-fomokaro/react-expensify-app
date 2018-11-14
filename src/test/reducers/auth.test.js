import authReducer from '../../reducers/auth';

test('should set up default auth values', () => {
  const state = authReducer({}, {type: '@@INIT'});
  expect(state).toEqual({});
});

test('should set uid for login', () => {
  const action = {
    type: 'LOGIN',
    uid: 'this_is_a_random_uid'
  }

  const state = authReducer({}, action);
  expect(state).toEqual({
    uid: 'this_is_a_random_uid'
  })
});

test('should remove uid for user', () => {
  const action = {
    type: 'LOGOUT',
  }

  const state = authReducer({uid: 'this_is_a_random_uid'}, action);
  expect(state).toEqual({});
});