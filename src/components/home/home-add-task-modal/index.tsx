import { Task, Option, FormInputItem } from '@/entities'
import { useEffect, useState } from 'react'
import StatusEnum from '@/enum/status'
import statusMasterDummy from '@/factory/master/status'
import { TheModal, TheButton, TheTextField, TheItemForm, TheSelect } from '@/components'
import Utils from '@/utils'

type HomeAddTaskProps = {
  title: string
  add: (item: Task) => void,
  close: () => void
}

const HomeGroupTask = ({add, close, title}: HomeAddTaskProps) => {

  const [form , setForm] = useState<Task>({
    id: Utils.helper.uuid(),
    title: '',
    content: '',
    status: StatusEnum.NEW
  })

  const [statusMaster, setStatusMaster] = useState<Option[]>([]);

  useEffect(() => {
    setStatusMaster(() => statusMasterDummy)
  }, [])
  

  const inputsHandler = (formInputItem: FormInputItem) =>{
    setForm((prevForm) => ({...prevForm,...{[formInputItem.name]: formInputItem.value}}))
  }

  return (
    <TheModal title={title}>
      <TheItemForm label='Title' className='mt-4'>
        <TheTextField
            name='title'
            onChange={(e) =>inputsHandler({name: e.target.name, value: e.target.value})}
            value={form.title}
          />
      </TheItemForm>

      <TheItemForm label='Content' className='mt-4'>
        <TheTextField 
          name='content'
          onChange={(e) =>inputsHandler({name: e.target.name, value: e.target.value})}
          value={form.content}
        />
      </TheItemForm>

      <TheItemForm label='Status' className='mt-4'>
        <TheSelect
          name='status'
          onChange={(e) =>inputsHandler({name: e.target.name, value: Number(e.target.value)})}
          listSelect={statusMaster} value={form.status}/>
      </TheItemForm>

      <div className='flex items-center mt-3'>
        <TheButton onClick={() => add(form)}>Create</TheButton>
        <div className='ml-4'>
          <span onClick={close} className='underline cursor-pointer'>close</span>
        </div>
      </div>
    </TheModal>
  )
}

export default HomeGroupTask