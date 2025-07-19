import { Button } from "./button";

interface SubmitSectionProps {
     isSubmitting: boolean;
     isFormValid: boolean;
     buttonText?: string;
     onSubmit: (e: React.FormEvent) => void;
}

export function SubmitSection({
     isSubmitting,
     isFormValid,
     buttonText,
     onSubmit,
}: SubmitSectionProps) {
     return (
          <Button
               type="submit"
               disabled={!isFormValid || isSubmitting}
               className={`w-full rounded-lg py-6 text-lg font-semibold transition-all duration-300 ${
                    isFormValid
                         ? "transform bg-gradient-to-r from-green-600 to-black shadow-lg hover:-translate-y-0.5 hover:from-green-700 hover:to-white hover:shadow-xl"
                         : "cursor-not-allowed bg-gray-300"
               }`}
          >
               {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                         <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                         Securing Your Spot...
                    </div>
               ) : (
                    "Register Now"
               )}
          </Button>
     );
}
