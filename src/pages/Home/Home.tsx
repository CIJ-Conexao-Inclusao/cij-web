import { Button } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setUser, removeUser } from "../../redux/user/userSlice";
import TUser, { Gender } from "../../types/TUser";

const Home = () => {
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);
  const dispatch = useAppDispatch();

  const user2: TUser = {
    name: "kenzo222",
    email: "t2",
    cpf: "12",
    gender: Gender.Male,
    id: 12,
    password: "sd2f",
    phone: "1232",
  };

  const teste = () => {
    console.log("teste");
    dispatch(setUser({ user: user2 }));
  };

  const teste2 = () => {
    console.log("teste");
    dispatch(removeUser());
  };

  return (
    <div>
      <Button variant="contained" onClick={teste}>
        Add user
      </Button>
      <Button variant="contained" onClick={teste2}>
        Remove user
      </Button>
      Home
      {user?.name}f
    </div>
  );
};

export default Home;
