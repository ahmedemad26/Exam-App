import { Button } from '@/components/ui/button'
import { ForgotPasswordSteps } from '@/lib/types/auth';
import { cn } from '@/lib/utils/tailwind-cn';
import { MoveLeft } from 'lucide-react'
import React from 'react'


//Props
type PreviousButtonProps = {
  setStep: (step: ForgotPasswordSteps) => void;
}

export default function PreviousButton({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button type='button' variant="ghost" className={cn("border border-gray-200 size-10 flex items-center justify-center", className)} {...props} >
       <MoveLeft />
    </Button>
  )
}
