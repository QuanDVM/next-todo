import styles from "./the-card.module.scss";

interface TheCardProps {
  children?: React.ReactNode;
}

const TheCard = ({children}: TheCardProps) => {
  return (
    <>
     <div className={styles.theCard}>{ children }</div>
    </>
  )
}

export default TheCard