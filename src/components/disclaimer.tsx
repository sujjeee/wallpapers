import { CircleHelp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Disclaimer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <CircleHelp className="size-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disclaimer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center gap-4 text-sm text-muted-foreground">
          <span>
            This website, created solely for educational purposes, demonstrates
            web scraping and proxy techniques.
          </span>
          <span>
            The images are accessed through publicly available media using the
            Panels app's own API. It does not engage in any shady or illegal
            activities.
          </span>
          <span>
            Built by{" "}
            <a
              href="https://x.com/sujjeeee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Sujjeee
            </a>
            . {""}
            API information available on{" "}
            <a
              href="https://github.com/nadimkobeissi/mkbsd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              GitHub
            </a>
            .
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
