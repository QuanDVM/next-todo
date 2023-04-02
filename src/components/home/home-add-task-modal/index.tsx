import { Task, Option } from '@/entities'
import { useEffect, useState } from 'react'
import StatusEnum from '@/enum/status'
import statusMasterDummy from '@/factory/master/status'
import { TheModal, TheButton, TheTextField, TheCard, TheItemForm } from '@/components'

type HomeAddTaskProps = {
  title: string
  add: (item: Task) => void,
  close: () => void
}

const HomeGroupTask = ({add, close, title}: HomeAddTaskProps) => {

  const [form , setForm] = useState<Task>({
    id: 0,
    title: '',
    content: '',
    status: StatusEnum.NEW
  })

  const [statusMaster, setStatusMaster] = useState<Option[]>([]);

  useEffect(() => {
    setStatusMaster(() => statusMasterDummy)
  }, [])
  

  const inputsHandler = (e: any) =>{
    setForm((prevForm) => ({...prevForm,...{[e.target.name]: e.target.value}}))
  }

  const submit = () =>{
    add(form)
  }

  return (
    <TheModal title={title}>
      <TheCard>
        <TheItemForm label='Title'>
          <TheTextField
              name='title'
              onChange={inputsHandler} 
              value={form.title}
            />
          </TheItemForm>

          <TheItemForm label='Content'>
            <TheTextField 
              name='content'
              onChange={inputsHandler} 
              value={form.content}
            />
          </TheItemForm>

          <TheItemForm label='Status'>
          <select name='status' onChange={inputsHandler} >
            {statusMaster.map((itemStatus) => (
              <option value={itemStatus.id} key={itemStatus.id}>{ itemStatus.label }</option>
              )
            )}
          </select>
          </TheItemForm>

        <TheButton onClick={submit}>Create</TheButton>
        <div>
          <span onClick={close}>close</span>
        </div>
        </TheCard>
    </TheModal>
  )
}

export default HomeGroupTask