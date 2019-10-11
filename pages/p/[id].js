import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const ChatRooms = () => {
  const router = useRouter();
  return (
    <Layout>
      <h1>{router.query.id}</h1>
    </Layout>
  );
};

export default ChatRooms;
