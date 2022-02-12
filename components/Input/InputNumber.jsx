const InputNumber = (props) => {
  return (
    <input
      type="number"
      step={0.01}
      min={0.01}
      placeholder={props.placeholder}
      className="py-3 md:px-5 shadow-sm focus:ring-blue-pf transition ease-in-out delay-100 focus:border-blue-pf mt-1 block w-full sm:text-sm border-2 focus:shadow-lg border-gray-300 rounded-full disabled:bg-gray-200 "
      value={props.value}
      id={props.id}
      disabled={props.disabled}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default InputNumber;
