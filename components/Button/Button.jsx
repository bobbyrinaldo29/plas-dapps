const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type="button"
      className={"transition duration-300 ease-in-out whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-400 hover:text-slate-200 " + props.customClasses}
    >
      {props.title}
    </button>
  );
};

export default Button;
