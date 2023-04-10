import { TheButton, TheCard } from '@/components';
import statusMasterDummy from '@/factory/master/status'
import { Task, Option } from '@/entities'
import { useEffect, useState } from 'react';
import { StatusEnum } from '@/enum';

type HomeTaskProps = {
  task: Task;
  removeTask: (idTaskSelect: string) => void,
};

const HomeGroupTask = ({task, removeTask}: HomeTaskProps) => {
  const [statusMaster, setStatusMaster] = useState<Option[]>([]);

  useEffect(() => {
    setStatusMaster(() => statusMasterDummy)
  }, [])

  const getStatusName = (statusId: StatusEnum): string => {
    return statusMaster.find(item => item.id === statusId)?.label || ''
  }

  return (
    <>
      <TheCard>
          <p>
            <span className="font-bold">Title:</span>
            <span>{ task.title }</span>
          </p>
          <p>
            <span className="font-bold">Content:</span>
            <span>{ task.content }</span>
          </p>
          <div className='flex justify-between items-center mt-3'>
            <p>
              <span>{ getStatusName(task.status) }</span>
            </p>
            <TheButton onClick={() => removeTask(task.id)}>Remove</TheButton>
          </div>
     </TheCard>
    </>
  )
}

export default HomeGroupTask