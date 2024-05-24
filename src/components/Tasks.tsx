import { useState } from 'react';
import styles from './Tasks.module.css'
import { CheckCircle, Trash } from 'phosphor-react';

interface TaskProps {
    content: string;
    onDeleteTask: (task: string) => void;
    onCompleteTask: (task: string) => void;
}

export function Tasks({ content, onDeleteTask, onCompleteTask }: TaskProps) {

    const [completed, setCompleted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    function handleDeleteTask() {
        onDeleteTask(content)
    }

    function handleCompleteTask() {
        onCompleteTask(content);
        setCompleted(!completed);
        setIsDisabled(!isDisabled);
    }
    console.log(setCompleted)

    return(
        <div className={styles.content}>
            <div className={styles.contentTask}>
                <span 
                    className={`${styles.radioCustom} ${completed ? styles.completedTask : ''}`}
                    onClick={handleCompleteTask}
                >
                    <span className={styles.checkedIcon}>
                        {completed ? <CheckCircle  /> : ''}
                    </span>
                </span>
                <span className={`${styles.text} ${completed ? styles.completedTaskText : ''}`}>
                    <p>{content}</p>
                </span>
                <button 
                    title='Deletar task'
                    onClick={handleDeleteTask}
                    ><Trash size={20}/>
                </button>
            </div>
        </div>
    )
}