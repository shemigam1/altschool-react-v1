import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import useHelloWorld from "./customHooks/useHelloWorld";

const useDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDay = () => {
    return currentDate.getDay();
  };

  const getMonth = () => {
    return currentDate.getMonth();
  };

  const addDay = (numberOfDays) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + numberOfDays);
    setCurrentDate(newDate);
  };

  const addMonth = (numberOfMonths) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + numberOfMonths);
    setCurrentDate(newDate);
  };

  return { currentDate, getDay, getMonth, addDay, addMonth };
};

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");
  const { value, setValue } = useHelloWorld();
  const { currentDate, getDay, getMonth, addDay, addMonth } = useDate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );

        const data = response.data;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleChange = ({ target }) => {
    setInput(target.value);
  };

  const handleEdit = (postId, updatedTitle) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, title: updatedTitle } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div>
      {posts.map((post) => (
        <div
          style={{ border: "1px dashed", marginBottom: "5px" }}
          key={post.id}
        >
          {post.title}
          <button
            onClick={() => {
              const updatedTitle = prompt("Enter updated title:");
              if (updatedTitle) {
                handleEdit(post.id, updatedTitle);
              }
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
      {value}
      <br />
      Date: {currentDate.toString()}
      <br />
      Day: {getDay()}
      <br />
      Month: {getMonth()}
      <br />
      <input type="text" value={input} onChange={handleChange} />
      <button
        onClick={() => {
          setValue(input);
        }}
      >
        Change The World
      </button>
    </div>
  );
}

export default App;
