import styles from '../css/app.module.css'
import { TaskCard } from './TaskCard'



export function ListToDo(tasks) {
  return (
    <div className={styles.container}>
      <section>
        <header></header>
      <ul>
        {
          tasks.map(task => {
            return (
              <TaskCard
              content={task.content}
              />
            )
          })
        }
      </ul>
      </section>
    </div>
  )
}