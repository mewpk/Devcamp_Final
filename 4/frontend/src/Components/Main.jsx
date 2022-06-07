import { Button, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const [dataCorona, setDataCorona] = useState(null);
  let navigate = useNavigate()
  const funcGetData = async () => {
    const data = await axios.get("https://corona.lmao.ninja/v2/countries")
    console.log(data);
    setDataCorona(data.data)
  }

  useEffect(() => {

    if (!dataCorona) {
      funcGetData()
      
    }
    console.log(dataCorona);


  }, [])


  const columns = [
    {
      title: 'country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'todayCases',
      dataIndex: 'todayCases',
      key: 'todayCases',
    },
    {
      title: 'todayDeaths',
      dataIndex: 'todayDeaths',
      key: 'todayDeaths',
    },
    {
      title: 'todayRecovered',
      dataIndex: 'todayRecovered',
      key: 'todayRecovered',
    },
    {
      title: 'Action',
      key: 'action',
      render: (x) => (<> <Button type="primary" onClick={()=>{
        navigate(x.country);
      }}>MORE</Button></> )
    },
  ];
 

  return (
    <div style={{ width: "80%", margin: "100px auto" }}>
      <Table columns={columns} dataSource={dataCorona} pagination={false}  rowKey={(dt) => dt.country} /> </div>
  )
}
