import { useContext, useEffect } from "react";
import axios from "axios";
import userContext from "../Custom Hooks/userContext";

const dowellLoginUrl =
  "https://100014.pythonanywhere.com/?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository";

const getUserInfoOther = async (session_id, setUserInfo) => {
  const session = {
    session_id: session_id,
  };
  const res = await axios({
    method: "post",
    url: "https://100093.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  setUserInfo(res.data); // Update user info in context
};

const getUserInfo = async (session_id, setUserInfo) => {
  const session = {
    session_id: session_id,
  };

  const res = await axios({
    method: "post",
    url: "https://100014.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  setUserInfo(res.data); // Update user info in context
};

export default function useDowellLogin() {
  const { userInfo, setUserInfo } = useContext(userContext);

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
        getUserInfoOther(session_id, setUserInfo);
      } else {
        getUserInfo(session_id, setUserInfo);
      }
    }
    if (!localSession && !session_id) {
      window.location.replace(dowellLoginUrl);
    }
  }, []);
}
