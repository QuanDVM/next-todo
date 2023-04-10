import StatusEnum from '@/enum/status';

export default interface Task {
  id: string,
  title: string,
  content: string,
  status: StatusEnum
}