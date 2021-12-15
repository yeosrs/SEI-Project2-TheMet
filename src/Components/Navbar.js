import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const Navbar = (props) => {
  const [departments, setDepartments] = useState({ departments: [1] });
  const deptID = [
    1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
  ];
  const randomDept = deptID[Math.floor(Math.random() * deptID.length)];
  const [selected, setSelected] = useState(randomDept);
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/departments`;
        const res = await fetch(url);
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getDepartments();
  }, []);

  let depts = departments.departments.map((ele) => {
    return (
      //   <li key={ele.departmentID}>
      //     <a className="dropdown-item" href="!#">
      //       {ele.displayName}
      //     </a>
      //   </li>
      <option
        key={ele.departmentId}
        value={ele.departmentId}
        className="dropdown-item"
      >
        {ele.displayName}
      </option>
    );
  });

  useEffect(() => {
    props.chooseDept(selected);
  }, [selected]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="http://localhost:3000/">
          The Met
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="!#">
                About The Met
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="!#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Departments
              </a>
              <ul
                className="dropdown-menu"
                onChange={(e) => setSelected(e.target.key)}
              >
                {depts}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
