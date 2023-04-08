import styles from "./the-item-form.module.scss";

type TheItemFormProps = {
  label?: string
  children?: React.ReactNode
  className?: string
}

const TheItemForm = ({children, label, className}: TheItemFormProps) => {
  return (
    <>
      <div className={className}>
        <div className={styles.theItemForm}>
          { label && <label className="font-bold">{label}</label>}
          <div className={!!label ? 'mt-2' : ''}>{ children }</div>
        </div>
     </div>
    </>
  )
}

export default TheItemForm