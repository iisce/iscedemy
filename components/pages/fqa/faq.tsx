import MaxWidthWrapper from "@/components/layout/max-width-wrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FREQUENTLY_ASKED_QUESTIONS } from "@/lib/consts";
import * as Icons from '@/lib/icons';
export default function Faq() {
  return (
    <MaxWidthWrapper className="w-full py-12 md:py-24 lg:py-16">
      <div className="md:px-6">
        <div className="mx-auto w-full md:max-w-5xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl w-full font-bold md:tracking-tighter  md:text-3xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-700 md:text-md dark:text-gray-700">
              Get answers to the most common questions about PalmtechnIQ.
            </p>
          </div>
          <div className="space-y-6 w-full">
            {FREQUENTLY_ASKED_QUESTIONS.map((quesion, i) => (
              <div key={i}>
                <Collapsible className="">
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-md font-normal transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                    {quesion.question}
                    <div className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180">
                <Icons.ChevronDownIcon/>
                </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="md:px-4 w-full pt-4 text-gray-700 dark:text-gray-700">
                    {quesion.answer}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
