const uuid = (): string => {
  return Math.random().toString(16).slice(2);
};

export interface UtilHelperProps {
  uuid: () => string;
}

const helper: UtilHelperProps = {
  uuid,
};

export default helper;