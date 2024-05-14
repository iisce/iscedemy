import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FREQUENTLY_ASKED_QUESTIONS } from "@/lib/consts";
import * as Icons from '@/lib/icons';
export default function Faq() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
              Get answers to the most common questions about our PalmtechnIQ.
            </p>
          </div>
          <div className="space-y-6">
            {FREQUENTLY_ASKED_QUESTIONS.map((quesion, i) => (
              <div key={i}>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {quesion.question}
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180">
                <Icons.ChevronDownIcon/>
                </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
                    {quesion.answer}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
