import { HomeGroupTask, HomeAddTaskModal } from '@/components/home'
import { useEffect, useState } from 'react'
import { Task, Option } from '@/entities'
import taskDummy from '@/factory/home/tasks'
import statusMasterDummy from '@/factory/master/status'
import StatusEnum from '@/enum/status'
import { TheButton } from '@/components'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided
} from "react-beautiful-dnd";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusMaster, setStatusMaster] = useState<Option[]>([]);
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    setTasks(() => taskDummy)
    setStatusMaster(() => statusMasterDummy)
  }, [])

  const add = (item: Task) => {
    setTasks((prevTasks) => [...prevTasks,item])
    toggleModal();
  }

  const updateStatusTask = (id: number, idStatus: StatusEnum) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? {...task, status: idStatus} : task))
  }

  const toggleModal = () => {
    setIsShowAddModal((prevIsShowAddModal) => !prevIsShowAddModal)
  }

  const onDragEnd = (result: any) => {
    if (!result.destination || !result.source.index) return

    updateStatusTask(result.source.index, result.destination.index)
  };

  return (
    <>
     <div className="max-w-screen-lg mx-auto px-3">
      <h1 className="font-bold text-center">Title</h1>
      <div className="text-center">
        <TheButton onClick={toggleModal}>+Add</TheButton>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 grid-cols-4 mt-3">
        {statusMaster.map((itemStatus) => (
          <Droppable droppableId={itemStatus.label} key={itemStatus.id}>
          {(
            provided: DroppableProvided | any
          ) => (
              <div  ref={provided.innerRef}>
              <HomeGroupTask
                tasks={tasks?.filter((itemTask)=> itemTask.status === itemStatus.id)}
                status={itemStatus}
              />
              </div>
            )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
     </div>

     {isShowAddModal && <HomeAddTaskModal title='add Title' add={add}  close={toggleModal}/>}
    </>
  )
}
