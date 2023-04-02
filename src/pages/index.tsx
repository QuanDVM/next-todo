import { HomeGroupTask, HomeAddTaskModal } from '@/components/home'
import { useEffect, useState } from 'react'
import { Task, Option } from '@/entities'
import taskDummy from '@/factory/home/tasks'
import statusMasterDummy from '@/factory/master/status'
import StatusEnum from '@/enum/status'
import { TheButton } from '@/components'

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
  }

  const updateStatusTask = (id: number, idStatus: StatusEnum) => {
    console.log(id,'+', idStatus )
    console.log(tasks.map((task) => task.id === id ? {...task, status: idStatus} : task))
    setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? {...task, status: idStatus} : task))
  }

  const toggleModal = () => {
    setIsShowAddModal((prevIsShowAddModal) => !prevIsShowAddModal)
  }

  return (
    <>
     <h1>Title</h1>
     <TheButton onClick={toggleModal}>+Add</TheButton>
     <div className="flex">
     {statusMaster.map((itemStatus) => (
        <HomeGroupTask
          tasks={tasks?.filter((itemTask)=> itemTask.status === itemStatus.id)}
          status={itemStatus}
          key={itemStatus.id}
          updateStatusTask={updateStatusTask}
        />
      ))}
     </div>

     {isShowAddModal && <HomeAddTaskModal title='add Title' add={add}  close={toggleModal}/>}
    </>
  )
}
