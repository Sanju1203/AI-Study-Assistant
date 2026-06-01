export default function DashboardCards() {

  const cards = [

    {
      title: "Total Notes",
      value: 24
    },

    {
      title: "Flashcards",
      value: 120
    },

    {
      title: "Quizzes Completed",
      value: 18
    },

    {
      title: "Study Hours",
      value: 56
    }

  ]

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white p-5 rounded-2xl shadow-md"
        >

          <h2 className="text-gray-500 text-sm">
            {card.title}
          </h2>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>

        </div>

      ))}

    </div>

  )

}