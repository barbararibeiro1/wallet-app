import { MenuSelectType } from '../types/types';

function SelectComponent({ test, options, optionType,
  onHandleChange, selectOptions }: MenuSelectType) {
  return (
    <select
      value={ selectOptions }
      name={ optionType }
      id="any"
      data-testid={ test }
      onChange={ (event) => onHandleChange(event) }
    >
      {Array.isArray(options) && options.map((exchange, index) => (
        <option id="any" key={ index } value={ exchange }>
          {exchange}
        </option>
      ))}
    </select>
  );
}

export default SelectComponent;
