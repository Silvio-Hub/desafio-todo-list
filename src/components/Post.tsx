import { PlusCircle } from 'phosphor-react'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Tasks } from './Tasks';

export function Post() {

    const [newTask, setNewTask] = useState<string[]>([]);

    const [createdTask, setCreatedTask] = useState('');

    const [taskCount, setTaskCount] = useState(0);

    const [taskCompleteCount, setTaskCompleteCount] = useState(0);
    
    function handleCreatedTask() {
        setTaskCount(taskCount + 1)
    }

    function completeTask() {
        setTaskCompleteCount(taskCompleteCount + 1);
    }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();
        setNewTask([...newTask, createdTask]);
        setCreatedTask('')

    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event?.target.setCustomValidity('Esse campo é obrigatório!');
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event?.target.setCustomValidity('');
        setCreatedTask(event?.target.value)
    }

    function deleteTask(taskToDelete: string) {

        const tasksWithoutDeletedOne = newTask.filter(task => {
            return task !== taskToDelete;
        })

        setNewTask(tasksWithoutDeletedOne);
        setTaskCount(taskCount - 1)

        // if(taskToDelete.completed) {
        //     setTaskCompleteCount(taskCompleteCount - 1)
        // }

    }

    const isNewTaskEmpty = createdTask.length === 0;

    return (
        <article>
            <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
                <textarea 
                    name="addTask"
                    placeholder="Adicione uma nova tarefa"
                    onChange={handleNewTaskChange}
                    value={createdTask}
                    onInvalid={handleNewTaskInvalid}
                    required
                />
                <button type='submit' className={styles.addNewTask} disabled={isNewTaskEmpty} onClick={handleCreatedTask}>
                    <span>Criar</span>
                    <span className={styles.plusIcon}><PlusCircle size={24} /></span>
                </button>
            </form>

            <div className={styles.tasks}>
                <div className={styles.tasksNumbers}>
                    <p>Tarefas criadas <span className={styles.numberTask}>{taskCount}</span></p>
                    <p>Concluidas <span className={styles.numberTask}>{taskCompleteCount} de {taskCount}</span></p>
                </div>
            </div>

            <div>
                {newTask.map(task => {
                    return <Tasks 
                        key={task}
                        content={task} 
                        onDeleteTask={deleteTask}
                        onCompleteTask={completeTask}
                    />
                })}
                
            </div>
        </article>
    )
}