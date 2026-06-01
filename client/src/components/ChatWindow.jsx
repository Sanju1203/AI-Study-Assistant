import ChatMessage from "./ChatMessage"

export default function ChatWindow({

  messages

}) {

  return (

    <div className="space-y-4 h-[500px] overflow-y-auto border rounded-2xl p-5 bg-white shadow-md">

      {messages.map((message, index) => (

        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
        />

      ))}

    </div>

  )

}