import styles from "./the-text-field.module.scss";

interface InputCustomProps {
  value: string;
  placeholder?: string;
  name: string;
  onChange: (value: string) => void
  maxLength?: number
}

const TheTextField: React.FC<InputCustomProps> = ({
  value,
  placeholder,
  name,
  onChange
}) => {


  return (
    <input
      type="text"
      className={styles.theTextField}
      autoFocus
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TheTextField;