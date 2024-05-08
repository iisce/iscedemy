import { CURRICULUM } from '@/lib/consts'
import React from 'react'
import * as Icons from '@/lib/icons'
import { Button } from '@/components/ui/button'

export default function SingleCourseCurriculum() {
  return (
    <div className="bg-white">
        {CURRICULUM.map((courseCurriculum, i) => (
            <div className="mt-4" key={i}>
            <div className="mb-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{courseCurriculum.title}</h3>
              <ul className="mt-2">
              {courseCurriculum.topics.map((topic, i) => (
               <li className="flex items-center justify-between my-4 py-2 border-b border-gray-200" key={i}>
               <div className="flex items-center">
                 <div className='h-5 w-5 text-gray-400'>
                 <Icons.FileIcon />
                 </div>
                
                 <span className="ml-2 text-sm font-medium text-gray-600">{topic.name}</span>
                 <span className="text-xs hidden md:block font-semibold text-gray-500">{topic.duration}</span>
                 <span className="text-xs hidden md:block font-semibold text-gray-500">{topic.questions} </span>
     
                 </div>
                      
               {topic.previewUrl && (
                    <Button className="text-xs font-semibold hidden md:block text-blue-600 hover:text-blue-700">{topic.previewUrl}</Button>
                  )}             
                </li>
              ))}     
              </ul>
            </div>
          </div>
        ))}
    
  </div>
  )
}
