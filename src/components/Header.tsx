import styles from '../css/app.module.css';

import toDoLogo from '../assets/Logo.png';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={toDoLogo} alt="ToDo" title="To Do" />
    </header>
  )
}