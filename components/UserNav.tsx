import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { UserAuth } from "@/context/AuthContext"
import LogoutButton from "./LogoutButton"

export function UserNav() {
    const { user } = UserAuth()

    return (
        <>
            {user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user && user.photoURL} alt="@shadcn" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user && user.displayName}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user && user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        {/* <DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Settings</DropdownMenuItem>
				</DropdownMenuGroup> */}
                        <DropdownMenuSeparator />
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}
