import validate, { UtilValidateProps } from '@/utils/validate'
import helper, { UtilHelperProps } from '@/utils/helper'
export interface UtilsProps {
  validate: UtilValidateProps
  helper: UtilHelperProps
}

const utils: UtilsProps = {
  validate,
  helper,
}

export default utils
