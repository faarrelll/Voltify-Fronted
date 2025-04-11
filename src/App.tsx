
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-screen-xl h-full">
        {/* Kiri */}
        <div className="bg-red-300 flex-1 basis-[40%] rounded-lg flex items-center justify-center text-white text-3xl font-bold md:h-auto md:min-h-[424px]">
          1
        </div>

        {/* Kanan */}
        <div className="flex flex-col flex-1 basis-[60%] gap-4">
          {/* Atas kanan */}
          <div className="bg-green-300 h-[200px] rounded-lg flex items-center justify-center text-white text-3xl font-bold">
            2
          </div>

          {/* Bawah kanan */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Kiri bawah kanan */}
            <div className="bg-pink-400 h-[100px] md:h-auto flex-1 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
              3
            </div>

            {/* Kanan bawah kanan */}
            <div className="flex flex-col flex-1 gap-4">
              <div className="bg-blue-400 flex-1 rounded-lg flex items-center justify-center text-white text-2xl font-bold h-[100px] md:h-auto">
                4a
              </div>
              <div className="bg-yellow-400 flex-1 rounded-lg flex items-center justify-center text-white text-2xl font-bold h-[100px] md:h-auto">
                4b
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
