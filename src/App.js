// TODO: is it still necessary to import React for jsx?
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import GuessedWords from './GuessedWords';
import Input from './Input';
import Congrats from './Congrats';

import { getSecretWord } from './actions';

const App = function (props) {
  // get state from redux
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);

  // so that we can dispatch an action
  const dispatch = useDispatch();

  useEffect(() => {
    // get the secret word
    dispatch(getSecretWord());
  }, []);

  return (
    <div className="container">
      <h1>Jotto</h1>
      <div>the secret word is {secretWord}</div>
      <Congrats success={success} />
      <Input secretWord/>
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};

export default App;
