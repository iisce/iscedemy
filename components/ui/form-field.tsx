"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";

interface FormFieldProps {
     id: string;
     label: string;
     type?: string;
     value: string;
     onChange: (value: string) => void;
     required?: boolean;
     validate?: (value: string) => boolean;
     icon?: React.ReactNode;
}

export function FormField({
     id,
     label,
     type = "text",
     value,
     onChange,
     required = false,
     validate,
     icon,
}: FormFieldProps) {
     const [focused, setFocused] = useState(false);
     const isValid = validate ? validate(value) : value.trim().length > 0;

     return (
          <div className="group relative space-y-3">
               <div className="relative">
                    <Input
                         id={id}
                         type={type}
                         value={value}
                         onChange={(e) => onChange(e.target.value)}
                         onFocus={() => setFocused(true)}
                         onBlur={() => setFocused(false)}
                         className={`peer border-2 px-4 pb-2 pt-6 transition-all duration-300 ${
                              isValid
                                   ? "border-green-400"
                                   : focused
                                     ? "border-purple-400"
                                     : "border-gray-200"
                         } rounded-lg bg-white/50 focus:border-purple-400`}
                         placeholder=" "
                         required={required}
                         {...(type === "number" && { min: 16, max: 100 })}
                    />
                    <Label
                         htmlFor={id}
                         className={`pointer-events-none absolute left-4 transition-all duration-300 ${
                              value || focused
                                   ? "t op-0 text-xs font-medium text-primary"
                                   : "top-1 text-gray-500"
                         }`}
                    >
                         {label} {required && "*"}
                    </Label>
                    <div className="absolute right-3 top-4 flex items-center gap-2">
                         {icon}
                         {isValid && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                         )}
                    </div>
               </div>
          </div>
     );
}
