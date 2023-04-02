import { Task } from '@/entities'

type HomeTaskProps = {
  task: Task;
  onDragStart: (e: any, id: number) => void
  onDragEnd: () => void
};

const HomeGroupTask = ({task, onDragStart, onDragEnd}: HomeTaskProps) => {
  return (
    <>
      <div draggable onDragStart={e => onDragStart(e, task.id)} onDragEnd={onDragEnd}>
          <p>{ task.title }</p>
          <p>{ task.content }</p>
          <p>{ task.status }</p>
     </div>
    </>
  )
}

export default HomeGroupTask