const Alert = ({ msg, variant }) => {
  return (
    <div
      className={`w-full px-4 py-3 mb-2 ${
        variant === "success"
          ? "text-green-800 bg-green-300 border-green-600"
          : "text-red-700 bg-red-200 border border-red-400"
      } `}
    >
      <p className="text-center text-l">{msg}</p>
    </div>
  );
};

export default Alert;
