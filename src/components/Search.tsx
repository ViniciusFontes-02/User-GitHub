type SearchProps = {
  loadUser: (userName: string) => Promise<void>;
};

// icones
import { BsSearch } from "react-icons/bs";

// hooks
import { useState, KeyboardEvent } from "react";

// css
import classes from "./Search.module.css";

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");

  // fazendo busca pelo botao de enter
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadUser(userName);
    }
  };

  return (
    <div className={classes.search}>
      <h2>Busque por um usuario:</h2>
      <p>Conheça seus melhores repositórios</p>

      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Digite o nome do usuario"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => loadUser(userName)}>
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
