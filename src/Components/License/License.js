import { useEffect, useState } from "react";
const License = ({ url }) => {
    console.log(url);
    const [license, setLicense] = useState(null);
  
    async function getLicense(url) {
      console.log(url);
      const fetchData = await fetch(url);
      const dataJson = await fetchData.json();
      setLicense(dataJson.html_url);
    }
    useEffect(() => {
      getLicense(url);
    }, []);
  
    return !license ? (
      <h3>N/A</h3>
    ) : (
      <a href={license} target="_blank">
        {" "}
        {license}
      </a>
    );
  };
  
  export default License