import React, { FC, useState, useEffect } from 'react';
import remoting from '../../../services/remoting';
import {Table, Typography} from 'antd';
const { Paragraph, Text } = Typography;

const Page = (props) => {
    const [users, setUsers] = useState([]);
    const [usersFetched, setUsersFetched] = useState(false);

    useEffect(() => {
        if (!usersFetched) {
            remoting
            .get('/user')
            .then((response) => {
              if (response && Object.keys(response).length !== 0) {
                setUsers(response.data);
                setUsersFetched(true);
              }
            });
        }
      });

      const columns = [
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          sorter: true,
        },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        {
          title: 'Authorities',
          dataIndex: 'authorities',
          key: 'authorities',
          style: {whiteSpace: "wrap"},
          render: (text, record,  index) => {
              var authorities="";
              text.forEach(element => {
                authorities = authorities+element.authority+" ,"
              });
              return <div style={{whiteSpace: 'pre-wrap'}}>{authorities}</div>
          },
        },

        // {
        //   title: 'Creation',
        //   dataIndex: 'insert_date',
        //   key: 'insert_date',
        //   render: (text , record , index) => {
        //     // return <div>{record.insert_date ? moment(record.insert_date).format(DATE_PICKER_DATE_FORMAT) : ''}</div>;
        //     'TODO:'
        //   },
        //   sorter: true,
        // },
        
     
      ];
      
  return (
    <div className="table-container">
        <div>
            <h1>Users</h1>
        </div>
        <Table style={{ whiteSpace: 'pre'}} 
            rowKey="_id"
            //rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
          /> 
        {/* <Table
            rowKey="_id"
            //rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.data}
            pagination={this.props.pagination}
            onChange={this.props.onChange}
          /> */}
    </div>
)
  }
export default Page;
