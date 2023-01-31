import { useState } from "react";
import useField from "./hooks/useField";

import {
  Routes,
  Route,
  Link,
  useParams,
  useMatch,
  useNavigate,
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        anecdote
      </Link>

      <Link style={padding} to="/create">
        create{" "}
      </Link>
      {}

      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  );
};

const AnecdoteDetail = ({ anecdote }) => {
  console.log(anecdote, "she");
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p> has {anecdote.votes} votes</p>
    </div>
  );
};

const SetNotification = ({ notification }) => {
  const style = {
    border: "2px solid black",
    padding: "10px",
  };
  return <p style={notification ? style : null}> {notification} </p>;
};

const AnecdoteList = ({ anecdotes }) => {
  const id = useParams().id;

  // console.log("this is id", id);
  const anecdote = anecdotes.find((n) => {
    // console.log(n.id, Number(id));
    return n.id === id;
  });
  console.log("anecdote", anecdote);
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const navigate = useNavigate();

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,

      author: author.value,
      info: info.value,
      votes: 0,
    });
    console.log("content checking", content);
    // setContent("");
    // setAuthor("");
    // setInfo("");
    navigate("/");
  };

  const resetField = () => {
    content.resetField();
    author.resetField();
    info.resetField();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name="info" value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
        {/* <button onClick={() => resetField()}>reset</button> */}
      </form>
      <button onClick={() => resetField()}>reset</button>
    </div>
  );
};

const App = () => {
  const [notification, setNotification] = useState("");
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    // console.log(anecdote.content);
    setNotification(`new ${anecdote.content} has been created`);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anec) => anec.id === Number(match.params.id))
    : null;

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <SetNotification notification={notification} />

      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetail anecdote={anecdote} />}
        ></Route>

        <Route
          path="/"
          element={<AnecdoteList anecdotes={anecdotes} />}
        ></Route>
        <Route path="/create" element={<CreateNew addNew={addNew} />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      {/* <CreateNew addNew={addNew} />
      </Routes> */}

      <Footer />
    </div>
  );
};

export default App;
