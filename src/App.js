import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import "./custom.css";

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    /**
     * Fetch data using fetch.
     */
    const fetchData = async () => {
      const response = await (
        await fetch("https://reqres.in/api/users")
      ).json();
      //const jsn = await response.json();
      const data = response.data;
      console.log(data);
      setUsers(data);
    };

    fetchData();

    /**
     * Fetch data using axios
     */
    // const loadUsers = async () => {
    //   const response = await axios.get("https://reqres.in/api/users");
    //   console.log(response.data.data);
    //   setUsers(response.data.data);
    // };

    // loadUsers();

    // componentWillUnmount()
    return () => {
      // cleanup.
      setUsers([]);
      setSuggestions([]);
    };
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];

    if (text.length > 0) {
      matches = users.filter((user) => {
        const regexp = new RegExp(`${text}`, "gi");
        return user.email.match(regexp);
      });
    }

    console.log(matches);
    setSuggestions(matches);
    setText(text);
  };

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={text}
        style={{ marginTop: "10px" }}
        className="col-md-12 input"
        onChange={(e) => onChangeHandler(e.target.value)}
        onBlur={() => {
          // setTimeout(() => {
          //   setSuggestions([]);
          // }, 100);
        }}
      />
      {suggestions &&
        suggestions.map((suggestion, index) => {
          return (
            <div
              key={index}
              className="suggestion col-md-12 justify-content-md-center"
              onClick={() => onSuggestHandler(suggestion.email)}
            >
              {suggestion.email}
            </div>
          );
        })}
    </div>
  );
}

export default App;
