import NewTask from "./NewTask";

function Tasks({tasks, onAdd, onDelete}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Aufgaben</h2>
      <NewTask onAdd={onAdd} />

      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          Dieses Projekt hat noch keine Aufgaben.
        </p>
      )}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map((task) => {
            return (
              <li key={task.id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button className="px-2 py-1 bg-stone-500 rounded-md text-stone-100 hover:bg-red-500"onClick={() => onDelete(task.id)}>Entfernen</button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Tasks;
