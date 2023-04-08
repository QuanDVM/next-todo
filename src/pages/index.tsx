import { HomeGroupTask, HomeAddTaskModal } from '@/components/home'
import { useEffect, useState } from 'react'
import { Task, Option } from '@/entities'
import taskDummy from '@/factory/home/tasks'
import statusMasterDummy from '@/factory/master/status'
import StatusEnum from '@/enum/status'
import { TheButton, TheCard } from '@/components'
import Utils from '@/utils'
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

  const addTask = (newTask: Task) => {
    if (!Utils.validate.requiredList(Object.values(newTask))) {
      alert('Input có tình người chút đi pa')
      return
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    toggleModal();
  }

  const removeTask = (idTaskSelect: string) => {
    setTasks((prevTasks) => prevTasks.filter(prevTask => prevTask.id !== idTaskSelect))
  }


  const updateStatusTask = (idTaskSelect: string, idStatus: StatusEnum) => {
    setTasks((prevTasks) => prevTasks.map((task) => task.id === idTaskSelect ? {...task, status: idStatus} : task))
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
      <TheCard className="mt-4">
        <div className='flex justify-between items-center'>
          <h1 className="font-bold text-center">Title Title Title Title Title</h1>
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
                  removeTask={removeTask}
                />
                </div>
              )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </TheCard>
     </div>

     {isShowAddModal && <HomeAddTaskModal title='Add Title' add={addTask}  close={toggleModal}/>}
    </>
  )
}
