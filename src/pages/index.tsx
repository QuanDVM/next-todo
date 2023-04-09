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
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";

type HomeGroupTasks = {
  status: Option
  tasks: Task[]
}

type TaskShowUpdateProps = {
  indexItemRemove: number
  statusRemoveId: StatusEnum
  indexItemAdd: number
  statusAddId: StatusEnum
}


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksTasksShow, setTasksShow] = useState<Array<HomeGroupTasks>>([]);
  const [statusMaster, setStatusMaster] = useState<Option[]>([]);
  const [isShowAddModal, setIsShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    setTasks(() => taskDummy)
    setStatusMaster(() => statusMasterDummy)
  }, [])

  useEffect(() => {
    handleTasksShow()
  },[tasks])

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

  const updateTaskShow = ({indexItemRemove, statusRemoveId, indexItemAdd, statusAddId}:TaskShowUpdateProps) => {
    const taskUpdate: Task =  tasksTasksShow.find(taskShow => taskShow.status.id === statusRemoveId)?.tasks[indexItemRemove] || {
      id: '',
      title: '',
      content: '',
      status: StatusEnum.NEW
    }


    setTasksShow((prevTasksShow) => prevTasksShow.map(prevTaskShow => {
      if (statusRemoveId === prevTaskShow.status.id) {
        prevTaskShow.tasks.splice(indexItemRemove, 1)
      }

      if (statusAddId === prevTaskShow.status.id) {
        prevTaskShow.tasks.splice(indexItemAdd, 0, {...taskUpdate, status: statusAddId});
      }

      return prevTaskShow
    }))

    setTasks(() => tasksTasksShow.map(taskShow => taskShow.tasks).flat())
  }

  const toggleModal = () => {
    setIsShowAddModal((prevIsShowAddModal) => !prevIsShowAddModal)
  }

  const handleTasksShow = () => {
    setTasksShow(()=> [])

    statusMaster.forEach((itemStatus) => {
      setTasksShow(
        prevData =>[...prevData,{ status: itemStatus, tasks: tasks?.filter((itemTask)=> itemTask.status === itemStatus.id)}]
      )
    })
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination || !result.source) return
    
    updateTaskShow({
      indexItemRemove: result.source.index,
      statusRemoveId: Number(result.source.droppableId),
      indexItemAdd: result.destination.index,
      statusAddId: Number(result.destination.droppableId)
    })
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
            <Droppable droppableId={itemStatus.id.toString()} key={itemStatus.id}>
            {(
              provided: DroppableProvided | any
            ) => (
                <div  ref={provided.innerRef}>
                <HomeGroupTask
                  tasks={tasksTasksShow?.filter((itemTask)=> itemTask.status.id === itemStatus.id)[0]?.tasks}
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
