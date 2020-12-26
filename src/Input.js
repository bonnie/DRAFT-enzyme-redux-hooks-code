import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { guessWord } from './actions';

const Input = function (props) {
  const [currentGuess, setCurrentGuess] = useState('');
  const success = useSelector((state) => state.success);
  const dispatch = useDispatch();
  // const success = false;
  // const dispatch = () => {};

  /**
   * Run `guessWord` action on the submitted word (if it's not empty)
   * @method submitGuessedWord
   * @param {Event} evt - Event that triggered the call.
   * @returns {undefined}
   */
  const submitGuessedWord = function (evt) {
    evt.preventDefault();
  
    // don't try to call guessWord on a non-word
    // it will error when it tries to 'split'
    if (currentGuess && currentGuess.length > 0) {
      dispatch(guessWord(currentGuess));           
    }

      // reset state
      setCurrentGuess('');
  };

  const contents = success ? null : (
    <form className="form-inline">
      <input
        data-test="input-box"
        className="mb-2 mx-sm-3"
        id="word-guess"
        type="text"
        value={currentGuess}
        onChange={(evt) => { setCurrentGuess(evt.target.value) }}
        placeholder="enter guess"
      />
      <button
        data-test="submit-button"
        onClick={(evt) => submitGuessedWord(evt)}
        className="btn btn-primary mb-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );

  return <div data-test="component-input">{contents}</div>;
};

export default Input;
