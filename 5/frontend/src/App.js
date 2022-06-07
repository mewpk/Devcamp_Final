import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css'
import axios from 'axios';


export default function App() {

  const [data , setData ] = useState(null)
  const [data2 , setData2 ] = useState(null)

  const getData = async ()=>{
    const data = await axios.get("http://localhost:3000/api/user")
    setData(data.data.data);
  }
  const getData2 = async ()=>{
    const data = await axios.get("http://localhost:3000/api/notuser")
    setData2(data.data.data);
  }

  useEffect(()=>{
    if (!data){
      getData()
      getData2()
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
  const columns2 = [
    {
      title: 'jobId',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Job name',
      key: 'job_name',
      dataIndex: 'job_name',
    },
    
  ];


  return (
    <div style={{width :"80%" , margin : "100px auto"}}>
    
    <Table style={{marginBottom :"100px"}} columns={columns} dataSource={data}  pagination={false}  rowKey={(dt) => dt.id}/>
    <Table columns={columns2} dataSource={data2}  pagination={false}  rowKey={(dt) => dt.id}/>
  
    </div>)
}
