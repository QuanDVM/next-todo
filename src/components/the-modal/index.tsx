import styles from "./the-modal.module.scss";

interface TheModalProps {
  title?: string
  children?: React.ReactNode;
}

const TheModal = ({children, title}: TheModalProps) => {
  return (
    <>
      <div className={styles.theModal}>
        <div className={styles.theModal__overlay}></div>
        <div  className={styles.theModal__main}>
          <p>{ title}</p>
          <div>{ children }</div>
      </div>
     </div>
    </>
  )
}

export default TheModal