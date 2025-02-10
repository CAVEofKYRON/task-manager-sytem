function Input({ label, textarea, inputRef, ...props }) {
  const classes =
    "w-full p-2 border border-stone-300 rounded-md bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-stone-400";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500 dark:text-stone-300">
        {label}
      </label>
      {textarea ? (
        <textarea ref={inputRef} className={classes} {...props} />
      ) : (
        <input ref={inputRef} className={classes} {...props} />
      )}
    </p>
  );
}

export default Input;
