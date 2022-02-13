const ButtonBorder = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      className={
        "transition duration-300 ease-in-out whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border-2 rounded-full shadow-sm text-sm font-medium border-green-pf text-green-pf hover:bg-green-pf hover:text-white hover:shadow-lg " +
        props.customClasses
      }
    >
      {props.icon}
      {props.icon ? <span>&nbsp;</span> : null}
      {props.title}
    </button>
  );
};

export default ButtonBorder;
