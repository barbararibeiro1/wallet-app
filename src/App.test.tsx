import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import WalletForm from './components/WalletForm';

describe('Testes aplicação Trybewallet', () => {
  const testeIdPassword = 'password-input';

  const isValidEmail = 'barbara@gmail.com';
  const isValidPassword = '123456';

  test('Verifica se a tela Login é renderizada corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByRole('textbox', { name: 'Email' });
    const inputPassword = screen.getByLabelText(/senha:/i);

    expect(inputLogin).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('Verifica se o formulário está em branco', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByTestId(testeIdPassword)).toHaveValue('');
  });

  test('Verifica se existe um botão de login', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeInTheDocument();
  });

  test('Verifica se o botão de login está inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeDisabled();
  });

  test('Verifica se os dados do formulários estão corretamente preenchidos', async () => {
    renderWithRouterAndRedux(<App />);

    const inputLogin = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(testeIdPassword);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(inputLogin, isValidEmail);
    await userEvent.type(inputPassword, '0000');

    expect(buttonEl).toBeDisabled();

    await userEvent.clear(inputLogin);
    await userEvent.clear(inputPassword);

    await userEvent.type(inputLogin, isValidEmail);
    await userEvent.type(inputPassword, isValidPassword);

    expect(buttonEl).toBeEnabled();
  });

  test('Da página de login o usuário é redirecionado pra pagina wallet', async () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    const inputLogin = screen.getByRole('textbox', { name: 'Email' });
    const inputPassword = screen.getByLabelText(/senha:/i);

    fireEvent.change(inputLogin, { target: { value: isValidEmail } });
    fireEvent.change(inputPassword, { target: { value: isValidPassword } });

    await userEvent.click(buttonEl);

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(addExpenseBtn).toBeInTheDocument();
  });
});

describe('WalletForm Component', () => {
  beforeEach(() => {
    render(
      <Provider store={ store }>
        <WalletForm />
      </Provider>,
    );
  });
  test('Verifica se o componente WalletForm é renderizado', () => {
    const form = screen.getByTestId('form-id');
    expect(form).toBeInTheDocument();
  });

  test('Verifica se os elementos de entrada estão presentes', () => {
    const despesaElement = screen.getByTestId('value-input');
    const descriptionElement = screen.getByTestId('description-input');
    const currencyElement = screen.getByTestId('currency-input');
    const methodElement = screen.getByTestId('method-input');
    const tagElement = screen.getByTestId('tag-input');

    expect(despesaElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(currencyElement).toBeInTheDocument();
    expect(methodElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
  });

  test('Verifica se a função de submissão do formulário está funcionando corretamente', () => {
    const despesaElement = screen.getByTestId('value-input');
    const descriptionElement = screen.getByTestId('description-input');
    const submitButton = screen.getByRole('button');

    fireEvent.change(despesaElement, { target: { value: '100' } });
    fireEvent.change(descriptionElement, { target: { value: 'Despesa teste' } });
    fireEvent.click(submitButton);
  });
});
