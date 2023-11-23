import { useEffect, useState } from "react";
import NewsService from "../../services/NewsService";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [news, setNews] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    NewsService.list()
      .then((res) => {
        setNews(res.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full mt-4 flex gap-2 items-center justify-center">
        <CircularProgress />
        Carregando...
      </div>
    );
  }
  return <div className="mt-2">Home</div>;
};

export default Home;
