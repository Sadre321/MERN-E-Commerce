import { message, Table } from "antd"
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [userData,setUserData]=useState([]);
  const [loading,setLoading]=useState(false);

  const fetchUsers = useCallback( async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/users`);

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        
        message.error("Giriş yaparken bir hata oluştu");
      }
    } catch (error) {
      console.log("Giriş hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }finally{
      setLoading(false);
    }
  },[apiUri]);

  useEffect(()=>{
    fetchUsers();
  },[fetchUsers]);
  
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    
  ];

  return (
    <Table dataSource={userData} columns={columns} rowKey={(record=>record._id)} loading={loading}></Table>
  )
}

export default AdminUserPage