import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import styles from './css/app.module.css';

import { Header } from './components/Header';
import { TaskCard } from './components/TaskCard';
import { NoTasks } from './components/NoTasks';

export interface TaskType {
  id: string
  content: string
  isCompleted: boolean
}

export default function App () {

  const [tasks, setTasks] = useState<TaskType[]>([])

  const [newTaskContent, setNewTaskContent] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tasksCreated = tasks.length;

  const tasksCompleteds = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isCompleted) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewTaskContent(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const taskCreation: TaskType = {id: uuidv4(), content: newTaskContent, isCompleted: false};

    setTasks((state) => [...state, taskCreation]);
    setNewTaskContent('');
  }

  function handleNewTaskContentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  function completeTask(id: string) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;
    const task = tasks[taskIndex]
    setTasks ((prevValue) =>{
      return [
        ...prevValue.slice(0, taskIndex),
        {...task, isCompleted:!task.isCompleted},
        ...prevValue.slice(taskIndex +1)
      ]
    })
  }

  function deleteTask(id: string) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;
    setTasks((prevValue) =>{
      return [
        ...prevValue.slice(0, taskIndex),
        ...prevValue.slice(taskIndex +1)
      ]
    })
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
  
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("Tecla pressionada:", e.key); // Depuração para ver se o evento está sendo capturado
  
      if (e.key === "Enter") {
        e.preventDefault();
          
        const form = textarea.closest("form") as HTMLFormElement | null;
        if (form) {
          console.log("Enviando formulário...");
          form.requestSubmit(); // Usa requestSubmit para evitar problemas com validações
        }
      }
    };
  
    textarea.addEventListener("keydown", handleKeyDown);
    return () => textarea.removeEventListener("keydown", handleKeyDown);
  }, []);
  

  return (
    <>
      <Header />
      <main>
        <form onSubmit={handleCreateNewTask} className={styles.inputAddNewComment}>
          <textarea
          ref={textareaRef}
          name="comment"
          placeholder="Adicione uma nova tarefa"
          value={newTaskContent}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskContentInvalid}
          required
          />
          <button type='submit'>
            <span>Criar</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <g clip-path="url(#clip0_20601_58)">
              <path d="M7.98373 1.45158C9.27565 1.45158 10.5386 1.83468 11.6128 2.55244C12.687 3.27019 13.5242 4.29037 14.0186 5.48395C14.513 6.67754 14.6424 7.99092 14.3903 9.25802C14.1383 10.5251 13.5161 11.689 12.6026 12.6026C11.6891 13.5161 10.5252 14.1382 9.25807 14.3903C7.99097 14.6423 6.67759 14.5129 5.484 14.0185C4.29042 13.5241 3.27025 12.6869 2.55249 11.6127C1.83473 10.5385 1.45163 9.2756 1.45163 7.98368C1.45832 6.25332 2.14867 4.59574 3.37223 3.37218C4.59579 2.14862 6.25337 1.45827 7.98373 1.45158ZM7.98373 5.77648e-06C6.40611 0.00645971 4.86578 0.480174 3.55717 1.36134C2.24857 2.24252 1.23037 3.49164 0.631106 4.95102C0.031846 6.4104 -0.121605 8.01461 0.190125 9.56114C0.501855 11.1077 1.26479 12.5272 2.38262 13.6404C3.50044 14.7537 4.92304 15.5108 6.47082 15.8162C8.01861 16.1217 9.62218 15.9617 11.0791 15.3564C12.536 14.7512 13.781 13.7279 14.6568 12.4158C15.5326 11.1036 16 9.5613 16.0001 7.98368C16.0001 6.93249 15.7925 5.89165 15.3892 4.92089C14.986 3.95014 14.395 3.06857 13.6502 2.32679C12.9053 1.58501 12.0214 0.997618 11.049 0.598327C10.0766 0.199035 9.0349 -0.00429452 7.98373 5.77648e-06Z" fill="#F2F2F2"/>
              <path d="M11.707 7.38129H8.4954V4.16968H7.41397V7.38129H4.19873V8.46271H7.41397V11.6743H8.4954V8.46271H11.707V7.38129Z" fill="#F2F2F2"/>
              </g>
              <defs>
              <clipPath id="clip0_20601_58">
              <rect width="16" height="16" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className={styles.container}>
          <section>
            <header className={styles.listHeader}>
              <ul>
                <li>
                  <h2>Tarefas Criadas: <span><div className={styles.monoSpacedNumbers}>{tasksCreated}</div></span></h2>
                </li>
                <li>
                  <h2>Concluídas: <span><div className={styles.monoSpacedNumbers}>{tasksCompleteds}</div> de <div className={styles.monoSpacedNumbers}>{tasksCreated}</div></span></h2>
                </li>
              </ul>
            </header>
            { !tasksCreated && <NoTasks /> }
            <ul className={styles.taskList}>
              {
                tasks.map(task => {
                  return (
                    <TaskCard
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                    />
                  )
                })
              }
            </ul>
          </section>
        </div>
      </main>
    </>
  )
}