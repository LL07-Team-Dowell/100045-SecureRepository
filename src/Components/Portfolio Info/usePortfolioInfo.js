import { useEffect, useState } from "react";

export const usePortfolioData = () => {
  const [data, setData] = useState();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  if (userInfo) {
    setData(userInfo);
  }

  console.log(data);
  return data;
};
