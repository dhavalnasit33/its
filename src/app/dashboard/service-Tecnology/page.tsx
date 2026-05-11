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
import { PlusCircle, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ServiceTecnology } from "@/types/index";
import CreateServiceTechnologyDialog from "@/components/dashboard/service-technology/CreateServiceTechnologyDialog";
import EditServiceTechnologyDialog from "@/components/dashboard/service-technology/EditServiceTechnologyDialog";
import DeleteServiceTechnologyDialog from "@/components/dashboard/service-technology/DeleteServiceTechnologyDialog";

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
    const fetchItems = async (page = 1, value = searchValue) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                ...(value ? { value } : {}),
            });

            const res = await apiService<{
                success: boolean;
                data: ServiceTecnology[];
                pagination: { current: number; pages: number; total: number }
            }>(`/service-technology?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                setPagination(res.pagination);
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
    useEffect(() => { fetchItems(1); }, [searchValue]);
    const handleEditDialogOpen = (item: ServiceTecnology) => { setSelectedItem(item); setEditDialogOpen(true); };
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
                    <Button
                        onClick={() => router.push("/dashboard/service-Tecnology/create")}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New
                    </Button>
                }
            />

            <div className="flex items-center justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by label..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPagination((prev) => ({ ...prev, current: 1 }));
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
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
                                    <TableCell></TableCell>
                                </TableRow>
                            ))
                            : items.length > 0
                                ? items.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        className={`border dark:border-gray-300 ${index % 2 !== 0 ? 'bg-gray-200' : ''}`}
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
                                                    <DropdownMenuItem className="text-destructive"
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

            <div className="flex justify-between items-center gap-2 mt-4">
                <Button
                    className="bg-blue-600 text-white"
                    disabled={pagination.current === 1}
                    onClick={() => fetchItems(pagination.current - 1)}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {pagination.current} of {pagination.pages}
                </span>
                <Button
                    className="bg-blue-600 text-white"
                    disabled={pagination.current === pagination.pages}
                    onClick={() => fetchItems(pagination.current + 1)}
                >
                    Next
                </Button>
            </div>

            <CreateServiceTechnologyDialog
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                onSuccess={() => fetchItems(pagination.current)}
            />
            {selectedItem && (
                <EditServiceTechnologyDialog
                    isOpen={editDialogOpen}
                    onOpenChange={handleEditDialogChange}
                    initialData={{
                        id: selectedItem._id,
                        image: selectedItem.image,
                        label: selectedItem.label,
                        serviceId: selectedItem.serviceId._id,
                    }}
                    onSuccess={handleEditSuccess}
                />
            )}
            {selectedItem && (
                <DeleteServiceTechnologyDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    serviceTech={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )
            }
        </div>
    );
}
