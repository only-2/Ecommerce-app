import React from 'react';

// import Deleteproduct from './Deleteproduct';
// import Updateproduct from './Updateproduct';
import AddProduct from './AddProduct';
import './Admin.css';

const Admin = () => {
  return (
    <React.Fragment>
      <div className="adwrapper">
        <section className="head" style={{ fontSize: "3rem", padding: "3rem" }}>
          Welcome Admin
        </section>
        <AddProduct />
        {/*<Updateproduct />*/}
        {/*<Deleteproduct />*/}
      </div>
    </React.Fragment>
  );
}

export default Admin;

