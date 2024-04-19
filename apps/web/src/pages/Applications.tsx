import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Applications() {
    return (
        <div className="flex h-screen bg-[#121212] text-white">
            <aside className="w-60 flex flex-col items-center px-4 py-8 border-r border-gray-700">
                <div className="mb-16">
                    <VariableIcon className="h-8 w-auto" />
                </div>
                <nav className="flex flex-col gap-4 w-full">
                    <Button className="justify-start" variant="ghost">
                        DASHBOARD
                    </Button>
                    <Button className="justify-start" variant="ghost">
                        JOBS
                    </Button>
                    <Button className="justify-start" variant="ghost">
                        APPLICATIONS
                    </Button>
                    <Button className="justify-start" variant="ghost">
                        PROFILE
                    </Button>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Recently Applied</h1>
                    <div className="flex gap-4 mb-4">
                        <Input className="flex-1" placeholder="Placeholder" />
                        <Button variant="ghost">
                            <MicroscopeIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">Label</Badge>
                        <Badge variant="secondary">Label</Badge>
                        <Badge variant="secondary">Label</Badge>
                        <Badge variant="secondary">Label</Badge>
                        <div className="flex items-center ml-auto">
                            <Switch className="mr-2" id="sort" />
                            <Label htmlFor="sort">Sort by most recent</Label>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-8" />
                    <div className="flex justify-center items-center gap-2">
                        <Button variant="ghost">
                            <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="default">1</Button>
                        <Button variant="ghost">
                            <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

function ChevronLeftIcon(props) {
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
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function ChevronRightIcon(props) {
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
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


function MicroscopeIcon(props) {
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
            <path d="M6 18h8" />
            <path d="M3 22h18" />
            <path d="M14 22a7 7 0 1 0 0-14h-1" />
            <path d="M9 14h2" />
            <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
            <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>
    )
}


function VariableIcon(props) {
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
            <path d="M8 21s-4-3-4-9 4-9 4-9" />
            <path d="M16 3s4 3 4 9-4 9-4 9" />
            <line x1="15" x2="9" y1="9" y2="15" />
            <line x1="9" x2="15" y1="9" y2="15" />
        </svg>
    )
}