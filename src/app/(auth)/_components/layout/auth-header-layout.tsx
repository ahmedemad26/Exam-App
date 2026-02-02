import { cn } from "@/lib/utils/tailwind-cn";


function AuthTitle({ title, className, ...props }: React.HtmlHTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-3xl font-inter font-bold", className)} {...props} />
}

function AuthDescription({ className, ...props }: React.HtmlHTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-gray-500 mt-2 whitespace-normal lg:whitespace-nowrap", className)} {...props}/>
}

export default function AuthHeader({className, ...props}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props} />
  )
}

AuthHeader.Title = AuthTitle;
AuthHeader.Description = AuthDescription;

