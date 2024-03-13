function ExpenseItem({ expense }) {
  console.log('expense', expense);
  return (
    <div>
      <p>{expense.description}</p>
      <p>{expense.value}</p>
      <p>{expense.currency}</p>
    </div>
  );
}

export default ExpenseItem;
