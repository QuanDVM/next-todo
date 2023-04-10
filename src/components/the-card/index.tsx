import styles from "./the-card.module.scss";

interface TheCardProps {
  children?: React.ReactNode;
  className?: string
}

const TheCard: React.FC<TheCardProps> = ({children, className}) => {
  return (
    <>
     <div className={className}>
       <div className={styles.theCard}>{ children }</div>
     </div>
    </>
  )
}

export default TheCard