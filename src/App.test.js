import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { storeFactory } from '../test/testUtils';

jest.mock('./actions');
import { getSecretWord as getSecretWordMock } from './actions';

/**
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state={}) => {
  const store = storeFactory({ });
  const wrapper = mount(
    (<Provider store={store} >
      <App />
    </Provider>)
  );
  return wrapper;
}

describe('get secret word', () => {
  let wrapper;
  beforeEach(() => {
    // mount the component
    wrapper = setup({ secretWord: 'party', success: false });
  })
  test('get secret word on App mount', () => {
    // check to see if mock ran
    expect(getSecretWordMock).toHaveBeenCalledTimes(1);
  });
  test('don\'t get secret word on App update', () => {
    getSecretWordMock.mockClear();

   // using setProps because wrapper.update() doesn't trigger useEffect
   // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    // check to see that mock didn't run
    expect(getSecretWordMock).toHaveBeenCalledTimes(0);
  });
})

