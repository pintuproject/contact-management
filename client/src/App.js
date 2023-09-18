import React, { useState, useEffect } from "react";
import axios from "axios";
 
import MaterialTable from "@material-table/core";
 
 
function App() {
  const columns = [
    { title: "Contact Id", field: "id", editable:false},
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "SPOC", field: "SPOC" },
    { title: "Created Date", field: "createdDate",editable:false},
     
  ];

   const[data,setData]=useState([])
   const[contact,setContact]=useState(false)
   
  
  useEffect(() => {
    getData();
    
  }, [contact]);

  const getData = () => {
    axios.get("http://localhost:8080/api/v1/contact/get")
    .then(res=>setData(res.data))
    setContact(false)
  
  }
  console.log("data",data)

  const saveContact=(newData)=>{

    axios.post("http://localhost:8080/api/v1/contact/post",newData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  setContact(true)

  }

  const updateContact=(newData)=>{
    let instance={
      id:newData.id,
      name:newData.name,
      email:newData.email,
      SPOC:newData.SPOC,
      phone:newData.phone
    }

    axios.put("http://localhost:8080/api/v1/contact/update",instance, {
      
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
setContact(true)
  }

  const deleteContact =(id)=>{
    let instance={
      id:id
    }
    console.log("delete id is",instance)
    try{
    
    axios
      .delete(`http://localhost:8080/api/v1/contact/delete/${id}`
         ,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            
          },
          
        }
      
      )
  setContact(true)
      }
      catch(error)
      {
        console.log("delete error is ",error)
      }
  }

   
  const handleRowUpdate = (newData,oldData, resolve) => {
    
    let errorList = [];
    if (newData.id === "") {
      errorList.push("Please enter The id");
    }
    if (newData.name === "") {
      errorList.push("Please enter the name");
    }
    if (newData.phone === "") {
      errorList.push("Please enter the phone");
    }
    if (newData.email === "") {
      errorList.push("Please enter the email");
    }

    if (errorList.length < 1) {
       
   
    updateContact(newData)
    resolve();
    }
  };

   
  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.value === "") {
      errorList.push("Please enter The bill unit id");
    }
    if (newData.desc === "") {
      errorList.push("Please enter the Descriptions");
    }

    if (errorList.length < 1) {
      

saveContact(newData)
resolve();
    }

    }

   
  const handleRowDelete = (oldData, resolve) => {
    let id = oldData.id;
    deleteContact(id)
    resolve();
  };
  console.log("final Data", data);
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>

      <MaterialTable
        title=""
        data={data}
        columns={columns}
        style={{
          fontSize: " 13px",
          margin: "auto",
          width: "60%",
          border: "3px",
          paddingTop: "1%",
          paddingBottom: "3%",
          paddingLeft: "8%",
          paddingRight: "8%",
        }}
        options={{
          headerStyle: {
            backgroundColor: "#e6f0ff",
            color: "#000",
          },
          rowStyle: (rowData, index) => {
            return {
              backgroundColor: index % 2 ? "#f2f2f2" : "",
            };
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          

          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />
    </div>
  );
}

export default App;
