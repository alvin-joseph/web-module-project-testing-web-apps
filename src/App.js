import React from "react";

import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#"><img width="40px" src="./Lambda-Logo-Red.png"/> Lambda Integration Testing Challenge</a>
      </nav>
      <div className="App">
        <ContactForm />
      </div>
    </div>
  );
}

// const promiseAllWay = async () => {
//     const data1 = await axios("url1");
//     const data2 = await axios("url2");
//     //this bypasses .this and allows instant access to data
//     //hard to catch an error
//     Promise.all([data1, data2]).then((resp) => {
//       console.log(resp[0]);
//       console.log(resp[1]);
//     })
// }
