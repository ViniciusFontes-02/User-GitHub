import { useNavigate } from "react-router-dom";

import classes from "./BlackBtn.module.css";

const BackBtn = () => {
  // para fazer redirecionamentos
  const navigate = useNavigate();

  return (
    <>
      {/* navigate -1 => vota para a pagina anterior */}
      <button className={classes.back_btn} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </>
  );
};

export default BackBtn;
