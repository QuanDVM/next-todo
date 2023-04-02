import styles from "./the-item-form.module.scss";

type TheItemFormProps = {
  label?: string
  children?: React.ReactNode;
}

const TheCard = ({children, label}: TheItemFormProps) => {
  return (
    <>
     <div className={styles.theItemForm}>
      { label && <label>{label}</label>}
     <div>{ children }</div>
     </div>
    </>
  )
}

export default TheCard