import StatusEnum from '@/enum/status';

export default interface Task {
  id: number,
  title: string,
  content: string,
  status: StatusEnum
}