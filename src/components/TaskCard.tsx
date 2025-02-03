import styles from '../css/app.module.css';

interface TaskProps {
  id: string;
  content: string;
  isCompleted: boolean;
}

interface TaskCardProps {
  task: TaskProps;
  onIsChecked: (id: string) => void;
}

export function TaskCard({task, onIsChecked}: TaskCardProps) {


  return (
    <li className={styles.taskCard} id={task.id}>
      <fieldset onClick={() => onIsChecked(task.id)}>
        <label>
        <input
        readOnly
        type="checkbox"
        checked={task.isCompleted}
        />
          <p>{task.content}</p>
        </label>
      </fieldset>
      <button>x</button>
    </li>
  )
}