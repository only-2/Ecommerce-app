import React from 'react';

import Deleteproduct from './Deleteproduct';
import Updateproduct from './Updateproduct';
import './temporarycss/index11.css';
import Addpr from './Addpr';
const Admin = () => {
  return (
    <React.Fragment>
      <section className="head" style={{ fontSize: "3rem", padding: "3rem" }}>
        Welcome Admin
      </section>
      <div className="adwrapper">
        <Addpr />
        <Updateproduct />
        <Deleteproduct />
      </div>
    </React.Fragment>
  );
}

export default Admin;

