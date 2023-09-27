import axios from "axios";
import { useStateValue } from "./../../Context/StateProvider";
import React from "react";
import { useNavigate } from "react-router-dom";

const dowellLoginUrl =
  "https://100014.pythonanywhere.com/?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository";

const getUserInfoOther = async (session_id, dispatch) => {
  const session = {
    session_id: session_id,
  };
  const res = await axios({
    method: "post",
    url: "https://100093.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  dispatch({
    type: "SET_USER",
    user: res.data,
  }); // Update user info in context
};

const getUserInfo = async (session_id, dispatch) => {
  const session = {
    session_id: session_id,
  };

  const res = await axios({
    method: "post",
    url: "https://100014.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
  dispatch({
    type: "SET_USER",
    user: res.data,
  }); // Update user info in context
};

export default function useDowellLogin() {
  const [state, dispatch] = useStateValue();

  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  const searchParams2 = queryParams.get("id");
  const publicParams = queryParams.get("view");
  const qr_idParams = queryParams.get("qr_id");
  const company_idParams = queryParams.get("company_id");
  const navigate = useNavigate();

  const localSession = sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;
  const localId = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : null;


  React.useEffect(() => {
    const session_id = searchParams;
    const id = searchParams2;
    const public_view = publicParams;

      if (public_view && public_view == "public" && qr_idParams && company_idParams) {
        navigate("/viewproduct");
        return;
      }
   
    if (session_id) {
      sessionStorage.setItem("session_id", session_id);
      if (id || localId) {
        sessionStorage.setItem("id", id);
        getUserInfoOther(session_id, dispatch);
      } else {
        getUserInfo(session_id, dispatch);
      }
    }
    if (!localSession && !session_id) {
      window.location.replace(dowellLoginUrl);
    }
  }, []);
}
