const InputText = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className={"py-3 md:px-5 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 focus:shadow-lg border-gray-300 rounded-full transition duration-300 ease-in-out " + props.customClasses}
      value={props.value}
      id={props.id}
      readOnly={props.readOnly}
    />
  );
};

export default InputText;
