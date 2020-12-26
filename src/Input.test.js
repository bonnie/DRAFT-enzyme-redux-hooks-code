import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input from './Input';

// jest.mock('./actions');
// import { guessWord } from './actions' ;

// jest.mock('./actions', () => {
//   return {
//     ...jest.requireActual('./actions'),
//     __esModule: true,
//     guessWord: jest.fn().mockReturnValue({ type: 'mock' }),
//     getSecretWord: jest.fn().mockReturnValue({ type: 'mock' })
//   };
// });
// import { guessWord } from './actions' ;


/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <Input /> 
    </Provider>
  );
  // const wrapper = shallow(<Input />)
  return wrapper;
};

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submit = findByTestAttr(wrapper, 'submit-button');
      expect(submit.length).toBe(0);
    });
  });
});

describe('state controlled input field', () => {
  let savedReactUseState;
  beforeEach(() => {
    savedReactUseState = React.useState;
  });
  afterEach(() => {
    React.useState = savedReactUseState;
  })
  test('state updates with value of input box upon change', () => {
    // jest.mock('react', () => {
    //   return {
    //     ...jest.requireActual('react'),
    //     __esModule: true,
    //     useState: jest.fn()
    //   }
    // });
    const mockSetCurrentGuess = jest.fn();
    // const useStateMock = (initState) => [initState, mockSetCurrentGuess];
    // jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    React.useState = jest.fn().mockReturnValue(['', mockSetCurrentGuess]);
    const wrapper = setup({});
    const inputBox = findByTestAttr(wrapper, 'input-box');
    
    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('field is cleared upon submit button click', () => {
    const wrapper = setup({});
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });
    
    const inputText = findByTestAttr(wrapper, 'input-box').text()
    expect(inputText).toHaveLength(0);
  })
});

// describe('`guessWord` action creator', () => {
//   let wrapper;
//   beforeEach(() => {
//     // create wrapper with "word not yet guessed" state
//     // will use guessWord mock because of __mocks__/actions file
//     const setupOutput = setup({ success: false });
//     wrapper = setupOutput;

//     // add value to input box
//     const inputBox = findByTestAttr(wrapper, 'input-box');
//     inputBox.simulate('change', { target: { value: 'train' } })

//     // simulate click on submit button
//     const submit = findByTestAttr(wrapper, 'submit-button');
//     submit.simulate('click', { preventDefault() {} });
//   });
//   test('calls `guessWord` with input value as argument', () => {
//     expect(guessWord).toHaveBeenCalledWith('train');
//   });
//   test('input box clears on submit', () => {
//     const inputBox = findByTestAttr(wrapper, 'input-box');
//     expect(inputBox.text()).toBe('');
//   });
// });
