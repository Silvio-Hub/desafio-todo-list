
import './global.css'
import styles from './App.module.css'

import { Header } from './components/Header'
import { Post } from './components/Post'

function App() {
  return (
    <div>
      <div className={styles.header}>
        <Header />
      </div>
      <main>
        <Post />
      </main>

    </div>
  )
}

export default App
