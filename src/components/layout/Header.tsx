'use client';

import Link from 'next/link';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import NavItems from './NavItems';
import { navItemsList } from './Sidebar'; // Import the main nav items list

export default function Header() {
	const { user, logout } = useAuth();

	const getInitials = (name?: string) => {
		if (!name) return 'U';
		const names = name.split(' ');
		if (names.length > 1) {
			return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
		}
		return name.substring(0, 2).toUpperCase();
	};

	return (
		<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col p-0 w-[280px] bg-sidebar text-sidebar-foreground">
					<SheetHeader className="p-4 border-b">
						<SheetTitle asChild>
							<Link href="/dashboard" className="flex items-center gap-2 font-semibold">
								<Image
									src="/Main_logoW 1.png" // Your logo
									alt="Inspire Techno Solution Logo"
									width={120}
									height={40}
									className="object-contain"
									style={{ height: 'auto' }}
								/>
							</Link>
						</SheetTitle>
					</SheetHeader>
					<nav className="flex-1 overflow-y-auto p-4">
						<NavItems items={navItemsList} isMobile={true} />
					</nav>
					<div className="mt-auto p-4 border-t">
						<p className="text-xs text-muted-foreground">
							© {new Date().getFullYear()} Inspire Techno Solution
						</p>
					</div>
				</SheetContent>
			</Sheet>

			<div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-10 w-10 rounded-full">
								<Avatar className="h-9 w-9">
									{user.profile_picture && <AvatarImage src={user.profile_picture} alt={user.name} />}
									<AvatarFallback>{getInitials(user.name)}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">{user.name}</p>
									<p className="text-xs leading-none text-muted-foreground">
										{user.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/dashboard/profile">
									<Settings className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</header>
	);
}