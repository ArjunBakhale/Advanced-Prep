'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import clsx from 'clsx'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { Chat } from '@/components/Chatbot'
import { SectionProvider } from '@/components/SectionProvider'

export function Layout({ children, allSections }) {
  let pathname = usePathname()

  //print openai key

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-10" />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-6 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col lg:flex-row">
          <div className=" h-full px-4 sm:px-6 lg:w-3/5 lg:flex-row lg:px-8">
            <main className="flex-auto pt-14 ">{children}</main>
          </div>
          <div className="h-full lg:w-2/5 lg:border-l lg:border-zinc-900/10 lg:px-3 lg:py-3">
            {/* Chatbot content here, currently just an outlined box */}
            <Chat />
          </div>
        </div>

        <Footer />
      </div>
    </SectionProvider>
  )
}
