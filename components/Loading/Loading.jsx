const Loading = (props) => {
  return (
    <div className="items-center text-right text-sm">
      {props.title}{" "}
      <span className="animate-pulse bg-gray-500 px-2 rounded-full text-gray-500">
        0.000000
      </span>
    </div>
  );
};

export default Loading;
