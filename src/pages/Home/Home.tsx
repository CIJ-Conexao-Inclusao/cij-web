import { Button } from "@mui/material";

import UserService from "../../services/UserService";

const Home = () => {
  const teste = async () => {
    console.log("teste");
    const res = await UserService.getAll();
    console.log("aaa", res);
  };

  return (
    <div>
      <Button variant="contained" onClick={teste}>
        Defaultf
      </Button>
      Home
    </div>
  );
};

export default Home;
