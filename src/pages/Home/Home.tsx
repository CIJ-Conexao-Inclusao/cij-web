import { Button } from "@mui/material";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { defineUser, removeUser } from "../../redux/user/userSlice";
import TUser, { GENDER } from "../../types/TUser";

const Home = () => {
  const user = useAppSelector((rootReducer) => rootReducer.userReducer.user);
  const dispatch = useAppDispatch();

  const user2: TUser = {
    name: "kenzo222",
    email: "t2",
    cpf: "12",
    gender: GENDER.Male,
    id: 12,
    password: "sd2f",
    phone: "1232",
  };

  const teste = () => {
    console.log("teste");
    dispatch(defineUser({ user: user2 }));
  };

  const teste2 = () => {
    console.log("teste");
    dispatch(removeUser());
  };

  return (
    <div className="mt-2">
      <Button variant="contained" onClick={teste}>
        Add user
      </Button>
      <Button variant="contained" onClick={teste2}>
        Remove user
      </Button>
      Home
      <p>{user?.name}</p>
    </div>
  );
};

export default Home;
