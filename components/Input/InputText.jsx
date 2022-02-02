const InputText = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="py-3 md:px-5 shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-2 focus:shadow-lg border-gray-300 rounded-full "
      value={props.value}
      id={props.id}
    />
  );
};

export default InputText;
