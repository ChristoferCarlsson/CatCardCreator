import { useQuery } from "react-query";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { UserData } from "@/types/global";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [owner, setOwner] = useState(42);
  const [forceUpdate, setForceUpdate] = useState(false);
  
  const DB_API_URI = "http://localhost:3001";
  const endpoint = `${DB_API_URI}/users/${owner}`;
  const { isLoading, error, data } = useQuery(
    ["userData", owner],
    (): Promise<UserData> => fetch(endpoint).then((res) => res.json())
  );

  if (isLoading) return <div>"Loading..."</div>;

  if (error && error instanceof Error)
    return <div>{"An error has occurred: " + error.message}</div>;

  if (!data) return <div>No data</div>;

  const sendData = (ownerName:any) => {
    setOwner(ownerName.target.value);
  }

  const update = () => {
    setForceUpdate(!forceUpdate);
  }
  return (
    <>
      <div className={styles.main}>
        <div className={styles.row + " " + styles.header}>
          <div className={styles.description}>
            <h1 className={inter.className}>Cat Club 🐱</h1>
          </div>
        </div>
        <div className={styles.row + " " + styles.mainBox}>
          <div className={styles.col + " " + styles.catCardCreator}>
            <CatCardCreator update={update} data={data} link={DB_API_URI} owner={owner} />
          </div>
          <div className={styles.row + " " + styles.catDisplay}>
            <div className={styles.col}>
              <CatCardPanel herd={data.herd} />
            </div>
          </div>
        </div>
        <div className={styles.row + " " + styles.footer}>
          <DemoFooter sendData={sendData} owner={owner}/>
        </div>
      </div>
    </>
  );
}
