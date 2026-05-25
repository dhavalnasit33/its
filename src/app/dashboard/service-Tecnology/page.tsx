'use client';

import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PlusCircle, MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ServiceTecnology } from "@/types/index";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface DeleteServiceTechnologyDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    serviceTech: ServiceTecnology;
    onSuccess: () => void;
}

function DeleteServiceTechnologyDialog({
    isOpen,
    onOpenChange,
    serviceTech,
    onSuccess,
}: DeleteServiceTechnologyDialogProps) {
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await apiService<{ success: boolean; message: string }>(`/service-technology/${serviceTech._id}`, {
                method: "DELETE",
            });

            if (res.success) {
                toast({
                    title: "Deleted",
                    description: "Service technology has been deleted successfully."
                });
                onSuccess();
                onOpenChange(false);
            } else {
                toast({
                    title: "Error",
                    description: res.message || "Failed to delete service technology",
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
                    <AlertDialogTitle>Delete Service Technology</AlertDialogTitle>
                    <div className="space-y-3">
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the service technology
                            &quot;<strong>{serviceTech.label}</strong>&quot; and remove it from our servers.
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

export default function ServiceTechnologyPage() {
    const [items, setItems] = useState<ServiceTecnology[]>([]);
    console.log("🚀 ~ ServiceTechnologyPage ~ items:", items)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
    const [limit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ServiceTecnology | null>(null);
    const fetchItems = async (page: number = 1, value = searchValue) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                // page: String(page),
                // limit: String(limit),
                page: page.toString(),
                limit: limit.toString(),
                ...(value ? { value } : {}),
            });

            const res = await apiService<{
                success: boolean;
                data: ServiceTecnology[];
                pagination?: { current: number; pages: number; total: number }
            }>(`/service-technology?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                if (res.pagination)  setPagination(res.pagination);
            } else {
                setItems([]);
            }
        } catch (err) {
            console.error(err);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => { 
        fetchItems(pagination.current, searchValue); 
    }, [pagination.current,searchValue]);

    const handleEditDialogOpen = (item: ServiceTecnology) => {
        router.push(`/dashboard/service-Tecnology/${item._id}/edit`);
    };
    const handleEditDialogChange = (open: boolean) => { if (!open) setSelectedItem(null); setEditDialogOpen(open); };
    const handleEditSuccess = () => { fetchItems(pagination.current); };
    const handleDeleteDialogOpen = (item: ServiceTecnology) => { setSelectedItem(item); setDeleteDialogOpen(true); };
    const handleDeleteDialogChange = (open: boolean) => { if (!open) setSelectedItem(null); setDeleteDialogOpen(open); };
    const handleDeleteSuccess = () => { setDeleteDialogOpen(false); fetchItems(pagination.current); };
    return (
        <div>
            <PageHeader
                title="Service Technology"
                description="Manage your service technologies"
                actionButtons={
                <Link href="/dashboard/service-Tecnology/create">
                    <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
                }
            />

            <div className="flex items-center justify-between gap-3  mb-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by label..."
                        className="pl-9 h-10 rounded-lg border-gray-300 focus:ring-blue-500"
                        value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                setPagination((prev) => ({ ...prev, current: 1 }));
                            }}
                        />
                </div>
            </div>
            <div className="rounded-md border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead>Image</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                            : items.length > 0
                                ? items.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        // className={` hover:bg-gray-100 ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
                                        className="hover:bg-gray-100"
                                    >
                                        <TableCell>
                                            <img src={item.image} alt={item.label} className="h-10 w-10 rounded object-cover" />
                                        </TableCell>
                                        <TableCell>{item.label}</TableCell>
                                        <TableCell>{item.serviceId.mainTitle || "-"}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu
                                                open={dropdownOpen === item._id}
                                                onOpenChange={(open) => setDropdownOpen(open ? item._id : null)}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="bg-white border dark:border-gray-300">
                                                    <DropdownMenuItem
                                                        onClick={() => { handleEditDialogOpen(item); setDropdownOpen(null); }}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                        onClick={() => { handleDeleteDialogOpen(item); setDropdownOpen(null); }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-4">No service technologies found.</TableCell>
                                    </TableRow>
                                )}
                    </TableBody>
                </Table>
            </div>

            {pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-6 px-2">
                    <p className="text-sm text-muted-foreground">
                        Showing page {pagination.current} of {pagination.pages}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={pagination.current === 1}
                            onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                        >
                        Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={pagination.current === pagination.pages}
                            onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                        >
                        Next
                        </Button>
                    </div>
                </div>
            )}

            {selectedItem && (
                <DeleteServiceTechnologyDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    serviceTech={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )}
        </div>
    );
}
