import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Tag } from '@/components/Tag'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Button } from '@/components/Button'
import toast, { Toaster } from 'react-hot-toast'
import clsx from 'clsx'
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { AssistantMessage } from './AssistantMessage'

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })

  // Function to copy message content
  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content).then(
      () => {
        toast.success('Copied to clipboard!')
        setCopied(true)

        //wait 1 second then set copied to false
        setTimeout(() => {
          setCopied(false)
        }, 500)
      },
      (err) => {
        console.error('Failed to copy text: ', err)
      },
    )
  }

  let [copy, setCopied] = useState(false)

  return (
    <div className={clsx('sticky bottom-0 top-16 h-[100%] max-h-[900px]  ')}>
      <div className="flex h-full flex-col overflow-hidden rounded-2xl shadow-md dark:bg-white/2.5 dark:ring-1 dark:ring-white/10">
        {/* Header */}
        <div
          className={`'bg-white/2.5 bg-zinc-900' 'dark:border-b-white/5 flex h-9 items-center 
            gap-2 border-y border-b-white/7.5
           border-t-transparent bg-white px-4 dark:bg-slate-900`}
        >
          <div className="dark flex">
            <Tag variant="small">GPT-TURBO</Tag>
          </div>

          <span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />

          <span className="font-mono text-xs text-zinc-400">
            Nivaro Chatbot
          </span>
        </div>

        {/* Messages */}
        <section className="mb-auto overflow-y-auto  pb-5">
          {messages.map((m) => (
            <div
              className="group relative mt-4 flex flex-row border-b border-b-white/5 px-4 pb-3 pr-6"
              key={m.id}
            >
              <span className={clsx('mr-2 flex  font-bold')}>
                {m.role === 'user' ? (
                  <>
                    {/* User Icon */}
                    <div className="mr-2 flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-black shadow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        fill="white"
                        class="h-4 w-4"
                      >
                        <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"></path>
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    {/* AI Icon */}
                    <div className="text-primary-foreground mr-2 flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-white shadow">
                      <svg
                        fill="black"
                        viewBox="0 0 24 24"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                      >
                        <title>OpenAI icon</title>
                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
                      </svg>
                    </div>
                  </>
                )}
              </span>

              <div className="flex flex-col">
                {/* Message content */}
                <AssistantMessage m={m} />

                <button
                  className="absolute right-0 top-0 mr-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => copyToClipboard(m.content)}
                  style={{ cursor: 'pointer', padding: '4px' }}
                >
                  {copy ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Input */}
        <form
          className="sticky bottom-0 flex space-x-4 p-3 dark:ring-1 dark:ring-white/10"
          onSubmit={handleSubmit}
        >
          <input
            className=" h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}
