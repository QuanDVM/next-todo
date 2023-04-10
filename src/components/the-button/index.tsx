import styles from "./the-button.module.scss"

type TheButtonProps = {
  type?: "button" | "submit";
  children?: React.ReactNode;
  onClick?: () => void;
}

const TheButton: React.FC<TheButtonProps> = ({ type, children, onClick }) => {
  return (
    <button type={type} className={styles.theButton} onClick={onClick}>
      <div className={styles.theButton__main}>
        <span className={styles.theButton__background}></span> 
        <span className={styles.theButton__text}>{children}</span>
      </div>
    </button>
  );
};

export default TheButton;