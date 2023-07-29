import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false
};

function reducer (state, action) {
  switch (action.type) {
  case "openAccount":
    return {
      ...state, 
      balance: 500,
      isActive: true,
    };
    case "deposit":
      return {
        ...state,
        balance: state.balance + 150,
      }
    case "withdraw":
        return {
          ...state,
          balance: state.balance - 50,
        }
    case "requestLoan":
        return {
          ...state,
          loan: state.loan === 0 ? state.loan + 5000 : state.loan,
          balance: state.loan === 0 ? state.balance + 5000 : state.balance,
        }
    case "payLoan":
        return {
          ...state,
          loan: state.loan === 5000 ? state.loan - 5000 : state.loan,
          balance: state.loan === 5000 ? state.balance - 5000 : state.balance,
        }
    case "closeAccount":
      return{
        ...state,
        isActive: state.balance === 0 ? false : true,
      }
  default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive}, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button onClick={() => dispatch({ type: "openAccount" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: "deposit"})} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: "withdraw"})} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: "requestLoan"})} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: "payLoan"})} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => dispatch({type: "closeAccount"})} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}


