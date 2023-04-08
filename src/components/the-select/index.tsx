import { Option } from "@/entities";
import styles from "./the-select.module.scss";

interface SelectCustomProps {
  value: string | number;
  placeholder?: string;
  name: string;
  onChange: (value: any) => void
  maxLength?: number
  listSelect: Array<Option>
}

const TheTextField: React.FC<SelectCustomProps> = ({
  value,
  placeholder,
  name,
  onChange,
  listSelect
}) => {


  return (
    <select
      className={styles.theSelect}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      autoFocus
    >
      {listSelect.map((item) => (
        <option value={item.id} key={item.id}>{ item.label }</option>
        )
      )}
  </select>
  );
};

export default TheTextField;