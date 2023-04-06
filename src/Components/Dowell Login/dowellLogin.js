import { useEffect } from "react";
import axios from "axios";
const dowellLoginUrl =
  "https://100014.pythonanywhere.com/?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository";
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
 
};

export default function useDowellLogin() {
  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  const searchParams2 = queryParams.get("id");

  const localSession = sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;
  const localId = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : null;

  useEffect(() => {
    const session_id = searchParams;
    const id = searchParams2;

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
      window.location.replace(dowellLoginUrl);
    }
  }, []);
}
