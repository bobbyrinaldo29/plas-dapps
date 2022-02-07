const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      className={"transition duration-300 ease-in-out whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-pf hover:bg-sky-blue-pf " + props.customClasses}
    >
      {props.icon}
      {props.icon ? <span>&nbsp;</span> : null}
      {props.title}
    </button>
  );
};

export default Button;
