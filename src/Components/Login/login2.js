import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const dowellLoginUrl =
  "https://100014.pythonanywhere.com/?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository/";

const dowellLogoutUrl =
  "https://100014.pythonanywhere.com/sign-out?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository/";

const getUserInfoOther = async (session_id) => {
  const session = {
    session_id: session_id,
  };

  const res = await axios({
    method: "post",
    url: "https://100093.pythonanywhere.com/api/userinfo/",
    data: session,
  });

  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
};

const getUserInfo = async (session_id) => {
  const session = {
    session_id: session_id,
  };

  const res = await axios({
    method: "post",
    url: "https://100014.pythonanywhere.com/api/userinfo/",
    data: session,
  });

  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  sessionStorage.setItem("portfolio_info", JSON.stringify(res.data));
  console.log(res.data.portfolio_info[0].product);
  const portfolio = res?.data?.portfolio_info[0]?.product;
  if (portfolio) {
    console.log("Redirect to portfolio");
    window.location.replace(
      "http://localhost:3000/100045-SecureRepository/"
    );
  } else {
    console.log("create a portfolio");
    window.location.replace("http://localhost:3000/100045-SecureRepository/portfolio");
  }
};

export default function useDowellLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(sessionStorage.getItem("session_id"));
  const localSession = sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;
  const localId = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : null;
  console.log(localSession);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const id = searchParams.get("id");

    if (session_id) {
      sessionStorage.setItem("session_id", session_id);
      if (id || localId) {
        sessionStorage.setItem("id", id);
        getUserInfoOther(session_id);
      } else {
        getUserInfo(session_id);
      }
    }
    if (!localSession && !session_id) {
     
      window.location.replace("https://100014.pythonanywhere.com/");
    }
  }, []);
}
