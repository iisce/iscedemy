import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { JSX, SVGProps } from "react"

export default function Component() {
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
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                What is PalmtechnIQ?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              PalmtechnIQ is an online educational platform that offers a wide range of courses and resources in various fields such as technology, business, arts, and more. Our mission is to provide accessible and high-quality education to learners worldwide.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                How does PalmtechnIQ work?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              To get started with PalmtechnIQ, simply create an account on our website or mobile app. Browse through our course catalog, enroll in your preferred courses, and start learning at your own pace. Our platform offers interactive lessons, quizzes, projects, and discussions to enhance your learning experience.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                What types of courses does PalmtechnIQ offer?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              We offer courses in diverse subjects, including programming, web development, data science, graphic design, entrepreneurship, and many more. Our courses are designed by industry experts and updated regularly to ensure relevance and quality.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
                Are the courses on PalmtechnIQ self-paced?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              Yes, most of our courses are self-paced, allowing you to learn at a time and place that suits you. You can progress through the lessons and complete assignments at your own speed, with no deadlines or fixed schedules.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              Can I access PalmtechnIQ courses on mobile devices?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              Yes, PalmtechnIQ is accessible on both desktop and mobile devices. You can download our mobile app from the App Store or Google Play Store to access courses and continue learning on the go.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              How much do PalmtechnIQ courses cost?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              While some courses on PalmtechnIQ are free, others may require payment. The cost of courses varies depending on factors such as course duration, complexity, and instructor expertise. We also offer discounts and promotions from time to time.
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-lg font-medium transition-colors hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-800 dark:hover:bg-gray-700">
              Can I get a certificate upon completing a course?
                <ChevronDownIcon className="h-5 w-5 transition-transform [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pt-4 text-gray-500 dark:text-gray-400">
              Yes, upon successfully completing a course on PalmtechnIQ, you will receive a certificate of completion. Certificates can be shared on your LinkedIn profile or included in your resume to showcase your skills and achievements.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}