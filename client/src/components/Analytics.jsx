export default function Analytics() {

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-4">
        Study Analytics
      </h2>

      <div className="space-y-4">

        <div>

          <p className="mb-1">
            React Progress
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div className="bg-blue-500 h-4 rounded-full w-[70%]"></div>

          </div>

        </div>

        <div>

          <p className="mb-1">
            Backend Progress
          </p>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div className="bg-green-500 h-4 rounded-full w-[50%]"></div>

          </div>

        </div>

      </div>

    </div>

  )

}