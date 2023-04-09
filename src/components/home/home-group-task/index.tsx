import { Task, Option } from '@/entities'
import { HomeTask } from '@/components/home'
import {
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";

type HomeGroupTaskProps = {
  status: Option
  tasks: Task[]
  removeTask: (idTaskSelect: string) => void,
}

const HomeGroupTask = ({status, tasks, removeTask}: HomeGroupTaskProps) => {

  return (
    <>
      <div>
        <h3 className="text-center underline font-bold uppercase">{ status.label }</h3>
        {tasks?.map((item, index) => (
          <div className="mt-4" key={item.id}>
          <Draggable draggableId={`${item.title}${item.id}`} index={index}>
            {(provided: DraggableProvided ) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <HomeTask task={item} removeTask={removeTask} />
              </div>
            )}
          </Draggable>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomeGroupTask