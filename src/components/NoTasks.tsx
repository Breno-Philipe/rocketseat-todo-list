import styles from '../css/app.module.css'
import clipBoard from '../assets/clipboard.png'

export function NoTasks () {
  return (
    <section className={styles.noTasks}>
      <img src={clipBoard} alt="ClipBoard" />
      <p><strong>Você ainda não tem tarefas cadastradas</strong> Crie tarefas e organize seus itens a fazer</p>
    </section>
  )
}