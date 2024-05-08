// typagem
import { UserProps } from "../types/user";

// components
import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import Loader from "../components/Loader";

// hooks
import { useState } from "react";

const Home = () => {
  //state pode ser um desses dois tipos UserProps ou null
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // carregar usuario da API do gitHub
  const loadUser = async (userName: string) => {
    setIsLoading(true);
    setError(false);
    setUser(null);

    // acessar a api do github conforme o noem do usuario
    const res = await fetch(`https://api.github.com/users/${userName}`);

    const data = await res.json();

    setIsLoading(false);

    // VERIFICANDO SE DEU ERRO, PARA MOSTRAR MENSAGEM
    if (res.status === 404) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following } = data;

    // trabalhando orientado ao tipo
    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };

    setUser(userData);
  };

  return (
    <div>
      <Search loadUser={loadUser} />

      {/* se estiver carregando mostrar componente */}
      {isLoading && <Loader />}

      {/* se o usuario esta disponivel vai exibir o user login */}
      {user && <User {...user} />}

      {/* se o erro existir, ira mostrar o componente */}
      {error && <Error />}
    </div>
  );
};

export default Home;
