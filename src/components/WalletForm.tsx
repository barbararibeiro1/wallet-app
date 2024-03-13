import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import thunk from "redux-thunk";
import { RootState } from "../types/types";
import InputElement from "../helpers/Input Element";
import { setCurrencies, fetchData } from "../redux/actions";
import SelectComponent from "../helpers/Exchange Select";

const paymentOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const organizedTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

function WalletForm() {
  const dispatch = useDispatch();
  const [expense, setExpense] = useState('');
  const [description, setDescription] = useState('');
  const [userSelect, setUserSelect] = useState(
    {
      curencie: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  );
  const { wallet } = useSelector((state: RootState) => state);

  useEffect(() => {
    async function fetchAPI() {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const deleteCurrency = Object.keys(data).filter((currency) => currency !== 'USDT');
      dispatch(setCurrencies(deleteCurrency));
    }
    fetchAPI();
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserSelect({ ...userSelect, [name]: value });
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allData = {
      id: wallet.expenses.length || 0,
      value: expense,
      description,
      currency: userSelect.curencie,
      method: userSelect.method,
      tag: userSelect.tag,
      exchangeRates: {},
    };
    dispatch(fetchData([allData]));
    setExpense('');
    setDescription('');
  };
  return (
    <form action="" onSubmit={ submitForm }>
      <InputElement
        test="value-input"
        field="Despesa"
        onSetChange={ setExpense }
        setChange={ expense }
      />
      <InputElement
        test="description-input"
        field="Descrição"
        onSetChange={ setDescription }
        setChange={ description }
      />
      <SelectComponent
        test="currency-input"
        options={ wallet.currencies }
        onHandleChange={ handleChange }
        optionType="currencie"
        selectOptions={ userSelect.curencie }
      />
      <SelectComponent
        test="method-input"
        options={ paymentOptions }
        onHandleChange={ handleChange }
        optionType="method"
        selectOptions={ userSelect.method }
      />
      <SelectComponent
        test="tag-input"
        options={ organizedTag }
        onHandleChange={ handleChange }
        optionType="tag"
        selectOptions={ userSelect.tag }
      />
      <button>Adicionar Despesas</button>
    </form>
  );
}

export default WalletForm;
