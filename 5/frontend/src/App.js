import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css'
import axios from 'axios';


export default function App() {

  const [data , setData ] = useState(null)
  const getData = async ()=>{
    const data = await axios.get("http://localhost:3000/api/user")
    setData(data.data.data);
  }

  useEffect(()=>{
    if (!data){
      getData()
    }
    else{
      console.log(data);
    }
    
  })


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Firstname',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Job_name',
      key: 'job_name',
      dataIndex: 'job_name',
      // render: 
    },
    {
      title: 'Photo',
      key: 'action',
      render: (x)=>(
        <>
        <img src={require("./assets/img/"+x.job_name+'.jpg')} />
       
        </>
      )
    },
  ];


  return (
    <div style={{width :"80%" , margin : "100px auto"}}>
    
    <Table columns={columns} dataSource={data}  pagination={true}  rowKey={(dt) => dt.id}/>
  
    </div>)
}
