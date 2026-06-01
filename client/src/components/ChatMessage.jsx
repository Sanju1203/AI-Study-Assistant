import ReactMarkdown
  from "react-markdown"

import {

  Prism as SyntaxHighlighter

} from "react-syntax-highlighter"

import {

  vscDarkPlus

} from "react-syntax-highlighter/dist/cjs/styles/prism"

export default function ChatMessage({

  role,
  content

}) {

  const isUser =
    role === "user"

  return (

    <div
      className={`flex mb-4

        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >

      <div
        className={`max-w-[85%] p-4 rounded-2xl overflow-auto

          ${
            isUser

              ? "bg-blue-500 text-white"

              : "bg-gray-200 text-black"
          }
        `}
      >

        <ReactMarkdown

          components={{

            code({

              inline,
              className,
              children,
              ...props

            }) {

              const match =
                /language-(\w+)/.exec(
                  className || ""
                )

              return !inline && match ? (

                <SyntaxHighlighter

                  language={match[1]}

                  style={vscDarkPlus}

                  PreTag="div"

                  {...props}

                >

                  {String(children).replace(
                    /\n$/,
                    ""
                  )}

                </SyntaxHighlighter>

              ) : (

                <code
                  className="bg-gray-800 text-green-400 px-1 py-0.5 rounded"
                  {...props}
                >

                  {children}

                </code>

              )

            }

          }}

        >

          {content}

        </ReactMarkdown>

      </div>

    </div>

  )

}