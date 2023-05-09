import styles from "@/styles/Home.module.css";

const DemoFooter = (props:any) => {

  const changeOwner = (event:any) => {
    props.sendData(event)
  }

  return (
    <>
    <div className={styles.footerBox}>
      <select value={props.owner} name="catOwner" id="catOwner" onChange={() => changeOwner(event)}>
        <option value="42">Linda</option>
        <option value="66">John</option>
        <option value="74">Billy</option>
      </select>
    </div>
    </>
  )
};
export default DemoFooter;
