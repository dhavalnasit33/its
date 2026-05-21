'use client';

import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import apiService from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import type { ServiceManager } from "@/types/index";
import { Loader2 } from "lucide-react";

interface DeleteServiceManagerDialogProps {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	item: ServiceManager;
	onSuccess: () => void;
}

export default function DeleteServiceManagerDialog({
	isOpen,
	onOpenChange,
	item,
	onSuccess
}: DeleteServiceManagerDialogProps) {
	const { toast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const res = await apiService<{ success: boolean; message: string }>(`/service/${item._id}`, {
				method: "DELETE",
			});

			if (res.success) {
				toast({
					title: "Deleted",
					description: `${res.message} SEO data has also been removed.`
				});
				onSuccess();
				onOpenChange(false);
			} else {
				toast({
					title: "Error",
					description: res.message,
					variant: "destructive"
				});
			}
		} catch (error: any) {
			toast({
				title: "Error",
				description: error.message || "Something went wrong",
				variant: "destructive"
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Service</AlertDialogTitle>
					<div className="space-y-3">
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the service
							&quot;<strong>{item.name || item.mainTitle || item.category}</strong>&quot; and remove it from our servers.
						</AlertDialogDescription>
					</div>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting} onClick={() => onOpenChange(false)}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}