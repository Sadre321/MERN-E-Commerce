import { Button, message, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useState } from "react";

const UserPage = () => {
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
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
    } finally {
      setLoading(false);
    }
  }, [apiUri]);


  const deleteUser = async (deleteEmail) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUri}/api/users/${deleteEmail}`,{
        method:"DELETE"
      });

      if (response.ok) {
        message.success("Kullanici basari ile silindi");
        fetchUsers();
      } else {
        message.error("Silme islemi siraisinda bir hata oluştu");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };


  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
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
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_,record) => (
        <Popconfirm
          title="Kullanici silme"
          description="Kullanicinin silinmesini istiyor musunuz?"
          okText="Evet"
          cancelText="Hayir"
          onConfirm={()=>{
            deleteUser(record.email)
          }}
        >
          <Button type="primary" danger>Sil</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={userData}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    ></Table>
  );
};

export default UserPage;
