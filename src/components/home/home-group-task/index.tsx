import { Task, Option } from '@/entities'
import { HomeTask } from '@/components/home'
import { TheCard } from '@/components'
import {
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";

type HomeGroupTaskProps = {
  status: Option
  tasks: Task[]
}

const HomeGroupTask = ({status, tasks}: HomeGroupTaskProps) => {

  return (
    <>
      <div>
      <TheCard>
          <h3 className="text-center underline font-bold uppercase">{ status.label }</h3>
          <div className="mt-3">
          {tasks.map((item) => (
            <div key={item.id}>
            <Draggable draggableId={`${item.title}${item.id}`} index={item.id}>
              {(provided: DraggableProvided ) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <HomeTask task={item} />
                </div>
              )}
           </Draggable>
           </div>
          ))}
          </div>
      </TheCard>
      </div>
    </>
  )
}

export default HomeGroupTask