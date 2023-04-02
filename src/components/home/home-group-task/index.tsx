import { Task, Option } from '@/entities'
import { HomeTask } from '@/components/home'
import { useState } from 'react'
import StatusEnum from '@/enum/status'
import { TheCard } from '@/components'

type HomeGroupTaskProps = {
  status: Option
  tasks: Task[]
  updateStatusTask: (id: number, idStatus: StatusEnum) => void
}

const HomeGroupTask = ({status, tasks, updateStatusTask}: HomeGroupTaskProps) => {
  const [idTaskDrag, setIdTaskDrag] = useState<number>(0);
  const [idStatusDragOver, setIdStatusDragOver] = useState<number>(StatusEnum.NEW);

  const onDragTaskStart = (e: any, id: number) => {
    e.dataTransfer.effectAllowed = "move";
    console.log('start')
    setIdTaskDrag(() => id)
  }

  const onDragEnd = () => {
    console.log('end')
    //resetDataDrag()
  }

  const onDragOver = (idStatus: StatusEnum) => {
    console.log('vaovv', idStatus)
    // if (idStatusDragOver === idStatus) return
    
    // setIdStatusDragOver(() => idStatus)
    // console.log(idStatusDragOver)
    updateStatusTask(idTaskDrag, idStatus)
  }

  const resetDataDrag = () => {
    setIdTaskDrag(() => 0)
    setIdStatusDragOver(() => StatusEnum.NEW)
  }

  return (
    <>
      <div onDragOver={() => onDragOver(status.id)}>
      <TheCard>
          <h3>{ status.label }</h3>
          {tasks.map((item) => (
            <HomeTask task={item} key={item.id} onDragStart={onDragTaskStart}  onDragEnd={onDragEnd}/>
          ))}
      </TheCard>
      </div>
    </>
  )
}

export default HomeGroupTask