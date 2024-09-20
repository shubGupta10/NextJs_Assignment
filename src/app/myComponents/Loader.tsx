const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-300 shadow-lg">
        <span className="absolute inset-0 flex justify-center items-center text-4xl font-extrabold text-white">
        </span>
      </div>
    </div>
  );
};

export default Loader;
