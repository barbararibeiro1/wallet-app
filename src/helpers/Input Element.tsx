import InputElementType from '../types/types';

export default function InputElement({
  field, onSetChange, setChange, inputField = 'text', test = '' }: InputElementType) {
  return (
    <>
      <label htmlFor="">{field}</label>
      <input
        value={ setChange }
        onChange={ (event) => onSetChange(event.target.value) }
        type={ inputField }
        data-testid={ test }
      />
    </>
  );
}
