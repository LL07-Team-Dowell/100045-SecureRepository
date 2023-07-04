import React from "react";
import "./form.css";
import Popup from "../Popup/Popup";
import axios from "axios";

export default function RegisterForm() {
  const [formData, setFormData] = React.useState({
    link: "",
    name: "",
  });
  const [buttonPopup, setButtonPopup] = React.useState(false);

  const [status, setStatus] = React.useState(null);
  const [webHookLink, setWebHookLink] = React.useState(null);

  const [error, setError] = React.useState(" ");
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let re = /^https:\/\/\w/i;
    let re2 = /^\d{6,}-\w/i;

    if (!re.test(formData.link)) {
      alert("invalid Link");
      setError("link");
    } else if (!re2.test(formData.name)) {
      alert("Password Required");
      setError("name must start with a character");
    } else {
      setError("");
      console.log("no error");
      setButtonPopup(true);
      const data = JSON.parse(sessionStorage.getItem("userInfo"));
      const [dataSecureRepository] = data?.portfolio_info.filter(
        (item) => item.product === "Secure Repositories"
      );

      console.log(dataSecureRepository);

      const fetchData = async () => {
        const requestHeaders = {
          repository_name: formData.name,
          repository_url: formData.link,
          org_name: dataSecureRepository?.org_name,
          company_id: dataSecureRepository?.org_id,
          data_type: dataSecureRepository?.data_type,
          created_by: data?.userinfo?.username,
        };
        console.log(requestHeaders);

        try {
          const res = await axios.post(
            "https://100045.pythonanywhere.com/backup/repositoryClone/",
            requestHeaders
          );
          setStatus(res.data.status);
          setWebHookLink(res.data.webhook_link);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };
      fetchData();
    }
  }
  return (
    <div className="form-container">
      <h3>Register a Secure Repository</h3>
      <form>
        <input
          type="text"
          name="link"
          placeholder="Repository URL"
          onChange={handleChange}
          value={formData.link}
        />
        <input
          type="text"
          name="name"
          placeholder="Repository Name"
          value={formData.name}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} form={buttonPopup}>
        <div className="content">
          <p>{webHookLink}</p>
        </div>
      </Popup>
    </div>
  );
}
