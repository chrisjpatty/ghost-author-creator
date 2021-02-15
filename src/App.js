import * as React from "react";
import download from "js-file-download";
import templateUser from "./userTemplate";
import "./App.css";

const useForm = (initial) => {
  const [values, setValues] = React.useState(initial);
  const setValue = (e) => {
    const { name, value } = e.target;
    setValues((x) => ({ ...x, [name]: value }));
  };
  return [values, setValue];
};

function App() {
  const [values, setValue] = useForm({
    numAuthors: 0,
    name: "",
    email: "",
  });

  const handleSubmit = () => {
    const user = {
      meta: {
        exported_on: Date.now(),
        version: "3.41.3",
      },
      data: {
        users: [
          {
            ...templateUser,
            id: Number(values.numAuthors) + 1,
            name: values.name,
            email: values.email,
          }
        ]
      }
    };
    download(JSON.stringify(user, null, 2), "Ghost_Author_Import.json");
  };

  return (
    <div className="App">
      <header className="underline">
        <h1 className="underline">👻 Ghost Author Creator</h1>
        <p>
          Use this utility to create authors for your Ghost blog without having
          to invite them as staff users (useful for adding guest authors to
          Ghost blogs).
        </p>
        <p>
          To create a new author, fill out the form below and then follow the
          instructions for importing it into your blog.
        </p>
        <p>
          <i>
            While this should be a safe process, it never hurts to back up your
            blog first by navigating to <strong>Labs</strong> {"->"}{" "}
            <strong>Export your content</strong> and clicking{" "}
            <strong>export</strong>.
          </i>
        </p>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="column underline"
      >
        <div>
          <label>
            How many authors are there in your blog right now? <br />
            <i>
              This is important to make sure that we don't override an existing
              user.
            </i>
            <input
              required
              type="number"
              value={values.numAuthors}
              name="numAuthors"
              onChange={setValue}
            />
          </label>
        </div>
        <div>
          <label>
            Author's name
            <input
              required
              type="text"
              value={values.name}
              name="name"
              onChange={setValue}
            />
          </label>
        </div>
        <div>
          <label>
            Author's email
            <input
              required
              type="email"
              value={values.email}
              name="email"
              onChange={setValue}
            />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button> ⬅️{" "}
          <i>This will download a file.</i>
        </div>
      </form>
      <section>
        <h2>How to import authors to Ghost</h2>
        <p>
          <ol>
            <li>
              Open your ghost admin and navigate to <strong>Labs</strong>.
            </li>
            <li>
              Find the option called <strong>Import content</strong>.
            </li>
            <li>
              Select the .json file you just downloaded and click{" "}
              <strong>Import</strong>.
            </li>
            <li>
              If all goes well, your new author will show up in the{" "}
              <strong>Staff</strong> section, where you can further customize
              their profile image, website, and bio.
            </li>
          </ol>
        </p>
      </section>
      <footer>
        Made with 🐮 by{" "}
        <a href="https://www.twitter.com/chrisjpatty">Chris Patty</a>
      </footer>
    </div>
  );
}

export default App;
