import { useState, useReducer, useEffect } from "react";
import "./App.css";
import chef from "./images/chef.jpg";

function Header({ name, year }) {
  return (
    <header>
      <h1>{name}'s Kitchen</h1>
      <p>Copyright {year}</p>
    </header>
  );
}

const items = [
  "Macaroni and Cheese",
  "Salmon with Potatoes",
  "Tofu with Vegetables",
  "Butter Chicken",
];

const dishObjects = items.map((dish, i) => ({
  id: i,
  title: dish,
}));

function Main({ dishes, openStatus, onStatus }) {
  return (
    <>
      <div>
        <button onClick={() => onStatus(true)}>I want to be open</button>
        <h2>
          Welcome to this beautiful restaurant ! {openStatus ? "Open" : "Close"}
        </h2>
      </div>
      <main>
        <img
          src={chef}
          height={200}
          alt="A animated photo of smiling small boy chef"
        />
        <ul>
          {dishes.map((dish, i) => (
            <li key={dish.id} style={{ listStyleType: "none" }}>
              {dish.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

function App() {
  //const [status, setStatus] = useState(true);
  const [status, toggle] = useReducer((status) => !status, true);

  useEffect(() => {
    console.log(`The restaurant is ${status ? "open" : "closed"}`);
  }, [status]);
  return (
    <div>
      <h1>The restaurant is currently {status ? "Open" : "Closed"}.</h1>
      <button onClick={toggle}>{status ? "Close" : "Open"} Restaurant</button>
      <Header name="Mann" year={new Date().getFullYear()} />
      <Main dishes={dishObjects} openStatus={status} onStatus={toggle} />
    </div>
  );
}
export default App;
