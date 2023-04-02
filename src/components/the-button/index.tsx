import styles from "./the-button.module.scss"

type TheButtonProps = {
  type?: "button" | "submit";
  children?: React.ReactNode;
  onClick?: () => void;
}

const TheButton: React.FC<TheButtonProps> = ({ type, children, onClick }) => {
  return (
    <button type={type} className={styles.theButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default TheButton;