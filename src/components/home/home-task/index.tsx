import { Task } from '@/entities'

type HomeTaskProps = {
  task: Task;
};

const HomeGroupTask = ({task}: HomeTaskProps) => {
  return (
    <>
      <div>
          <p>
            <span className="font-bold">Title:</span>
            <span>{ task.title }</span>
          </p>
          <p>
            <span className="font-bold">Content:</span>
            <span>{ task.content }</span>
          </p>
     </div>
    </>
  )
}

export default HomeGroupTask