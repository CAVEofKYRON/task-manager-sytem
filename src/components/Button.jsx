function Button({ children, ...props }) {
  return (
    <button
      className="px-6 py-3 text-sm md:text-lg rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 dark:bg-stone-300 dark:text-stone-700 dark:hover:bg-stone-400 dark:hover:text-stone-950 transition-colors duration-200"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
