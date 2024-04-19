import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export default function Profile() {
    return (
        <div className="flex h-screen bg-[#121212]">
            <nav className="flex flex-col w-64 h-full px-4 py-8 bg-[#1E1E1E] border-r border-gray-800">
                <h2 className="text-3xl font-semibold text-white">dynamic</h2>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <aside>
                        <ul>
                            <li>
                                <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md" href="#">
                                    <GaugeIcon className="w-5 h-5 text-gray-800" />
                                    <span className="mx-4 font-medium">DASHBOARD</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md"
                                    href="#"
                                >
                                    <BriefcaseIcon className="w-5 h-5" />
                                    <span className="mx-4 font-medium">JOBS</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md"
                                    href="#"
                                >
                                    <ClipboardIcon className="w-5 h-5" />
                                    <span className="mx-4 font-medium">APPLICATIONS</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="flex items-center px-4 py-2 mt-5 text-gray-200 hover:bg-gray-700 hover:text-white rounded-md"
                                    href="#"
                                >
                                    <UserIcon className="w-5 h-5" />
                                    <span className="mx-4 font-medium">PROFILE</span>
                                </a>
                            </li>
                        </ul>
                    </aside>
                    <div className="flex items-center px-4 -mx-2">
                        <Avatar>
                            <AvatarImage alt="User avatar" src="/placeholder.svg?height=40&width=40" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h4 className="mx-2 font-medium text-gray-200">User</h4>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col flex-1 p-10">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage alt="Profile avatar" src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 font-medium text-white">
                        <div>Real Name</div>
                        <div className="text-sm text-gray-400">Amherst, Massachusetts, US - He/Him</div>
                        <div className="text-sm text-gray-400">University of Massachusetts at Amherst, Spring 2025</div>
                        <div className="text-sm text-gray-400">Bachelor of Science (BS) in Computer and Information Science</div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-white">Resume</h3>
                    <a className="text-indigo-400 hover:underline" href="#">
                        Link to resume
                    </a>
                </div>
            </div>
        </div>
    )
}

function BriefcaseIcon(props) {
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
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
    )
}


function ClipboardIcon(props) {
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
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
    )
}


function GaugeIcon(props) {
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
            <path d="m12 14 4-4" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
    )
}


function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}