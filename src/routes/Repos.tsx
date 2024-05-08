// css
import classes from "./Repos.module.css";

// typos
import { RepoProps } from "../types/repo";

// hooks
import { useState, useEffect } from "react";

// para pegar o nome do usuario pela url
import { useParams } from "react-router-dom";

// components
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import Repo from "../components/Repo";

const Repos = () => {
  const { username } = useParams();

  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRepos = async function (username: string) {
      setIsLoading(true);

      const res = await fetch(`https://api.github.com/users/${username}/repos`);

      // trasnformar os dados em json
      const data = await res.json();

      setIsLoading(false);

      // ordenando repositorios
      let orderedRepos = data.sort(
        (a: RepoProps, b: RepoProps) => b.stargazers_count - a.stargazers_count
      );

      // pegando os 5 melhores
      orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);
    };

    if (username) {
      loadRepos(username);
    }
  }, []);

  if (!repos && isLoading) return <Loader />;

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repositórios do usuario: {username}</h2>

      {/* se não existir repositorios  */}
      {repos && repos.length === 0 && <p>Não há repositórios...</p>}

      {/* se existir repositorios */}
      {repos && repos.length > 0 && (
        <div className={classes.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo key={repo.name} {...repo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Repos;
