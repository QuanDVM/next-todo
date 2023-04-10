

export interface UtilValidateProps {
  requiredList: (
    values: Array<any>
  ) => boolean
}

const requiredList = (
  values: Array<any>
) => {
  return values.every(item => !!item)
}

const validateRules: UtilValidateProps = {
  requiredList,
}

export default validateRules
