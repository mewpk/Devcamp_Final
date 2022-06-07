import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Show() {
  const [display, setDisplay] = useState(null);
  let country = useParams();
  let data;
  let navigate = useNavigate();
  //   console.log(country.id);
  //   console.log(display);
  const getData = () => {
    axios
      .get("https://corona.lmao.ninja/v2/countries/" + country.id)
      .then((res) => {
        data = res.data;
        data = [data];
        console.log(data);
        setDisplay(data);
      });
  };
  if (display === null) {
    getData();
  }

  return (
    <div style={{ width: "80%" ,margin : "100px auto"}}>
      <div >
        {display
          ? display.map((x) => (
              <div key={x}>
                <h1 key={x.country}>Country : {x.country}</h1>
                <h1 key={x.activePerOneMillion}>
                  activePerOneMillion : {x.activePerOneMillion}
                </h1>
                <h1 key={x.casesPerOneMillion}>
                  casesPerOneMillion : {x.casesPerOneMillion}
                </h1>
                <h1 key={x.criticalPerOneMillion}>
                  criticalPerOneMillion : {x.criticalPerOneMillion}
                </h1>
                <h1 key={x.population}>population : {x.population}</h1>
              </div>
            ))
          : ""}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          BACK
        </button>
      </div>
    </div>
  );
}
