// app/dashboard/seo-manager/page.tsx
"use client";

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
import {
    PlusCircle,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Search,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import apiService from "@/lib/apiService";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import type { SeoManager } from "@/types";
// import CreateSeoManagerDialog from "@/components/dashboard/seoManager/CreateSeoManagerDialog";
// import EditSeoManagerDialog from "@/components/dashboard/seoManager/EditSeoManagerDialog";
// import DeleteSeoManagerDialog from "@/components/dashboard/seoManager/DeleteSeoManagerDialog";
// import ViewSeoManagerDialog from "@/components/dashboard/seoManager/ViewSeoManagerDialog";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function SeoManagerPage() {
    const router = useRouter();
    const [items, setItems] = useState<SeoManager[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pages: 1,
        total: 0,
    });
    const [limit] = useState(50);
    const [searchValue, setSearchValue] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SeoManager | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    // Fetch SEO metadata
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
                data: SeoManager[];
                pagination: { current: number; pages: number; total: number };
            }>(`/seo-manager?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                setPagination(
                    res.pagination || { current: 1, pages: 1, total: res.data.length }
                );
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
        fetchItems(pagination.current,searchValue);
    }, [pagination.current,searchValue]);

    const handleViewDialogOpen = (item: SeoManager) => {
        setSelectedItem(item);
        setViewDialogOpen(true);
    };

    const handleEditDialogOpen = (item: SeoManager) => {
        setSelectedItem(item);
        setEditDialogOpen(true);
    };

    const handleEditDialogChange = (open: boolean) => {
        if (!open) setSelectedItem(null);
        setEditDialogOpen(open);
    };

    const handleEditSuccess = () => {
        fetchItems(pagination.current);
    };

    const handleDeleteDialogOpen = (item: SeoManager) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogChange = (open: boolean) => {
        if (!open) setSelectedItem(null);
        setDeleteDialogOpen(open);
    };

    const handleDeleteSuccess = () => {
        setDeleteDialogOpen(false);
        fetchItems(pagination.current);
    };

    const handleCreateSuccess = () => {
        setDialogOpen(false);
        fetchItems(pagination.current);
    };

    return (
        <div>
            <PageHeader
                title="SEO Manager"
                description="Manage SEO metadata for your pages"
                actionButtons={
                    <Button
                        onClick={() => router.push("/dashboard/seo-manager/create")}
                        // className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New
                    </Button>
                }
            />

            {/* 🔍 Search Field */}
            {/* <div className="flex items-center justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by title or slug..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPagination((prev) => ({ ...prev, current: 1 }));
                    }}
                    className="border border-gray-300 rounded px-3 py-2 w-64"
                />
            </div> */}
            <div className="relative w-full max-w-sm mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    type="search"
                    placeholder="Search by title or slug..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPagination((prev) => ({ ...prev, current: 1 }));
                    }}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
            </div>

            {/* Table */}
            <div className="rounded-md border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            {/* <TableHead>SEO Keyphrase</TableHead> */}
                            <TableHead>Seo Title</TableHead>
                            <TableHead>Management Type</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Skeleton className="h-5 w-40" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-32" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-40" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-20 rounded" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-32" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-8 w-8 ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : items.length > 0 ? (
                            items.map((item, index) => (
                                <TableRow
                                    key={item._id}
                                    className= "hover:bg-gray-100 "
                                >
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell className="text-sm ">
                                        {item.slug}
                                    </TableCell>
                                    {/* <TableCell>
                                        {item.seo_keyphrase ? (
                                            <span className=" ">
                                                {item.seo_keyphrase}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell> */}
                                    <TableCell>
                                        {item.seo_title ? (
                                            <span className="">
                                                {item.seo_title}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={item.isAutoManaged ? "default" : "secondary"}
                                            className={item.isAutoManaged ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                                        >
                                            {item.isAutoManaged ? "Auto-Managed" : "Independent"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(item.createdAt), "PPpp")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu
                                            open={dropdownOpen === item._id}
                                            onOpenChange={(open) =>
                                                setDropdownOpen(open ? item._id : null)
                                            }
                                        >
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        handleViewDialogOpen(item);
                                                        setDropdownOpen(null);
                                                    }}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" /> View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        handleEditDialogOpen(item);
                                                        setDropdownOpen(null);
                                                    }}
                                                >
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                    onClick={() => {
                                                        handleDeleteDialogOpen(item);
                                                        setDropdownOpen(null);
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-4">
                                    No SEO metadata found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
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


            {/* Create Dialog */}
            {/* <CreateSeoManagerDialog
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                onSuccess={handleCreateSuccess}
            />

            {selectedItem && (
                <ViewSeoManagerDialog
                    isOpen={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    item={selectedItem}
                />
            )}

            {selectedItem && (
                <EditSeoManagerDialog
                    isOpen={editDialogOpen}
                    onOpenChange={handleEditDialogChange}
                    initialData={{
                        id: selectedItem._id,
                        title: selectedItem.title,
                        slug: selectedItem.slug,
                        seo_keyphrase: selectedItem.seo_keyphrase || "",
                        seo_title: selectedItem.seo_title || "",
                        meta_description: selectedItem.meta_description || "",
                        cover_image: selectedItem.cover_image || "",
                        // 🆕 PASS THE NEW FIELDS
                        linkedService: selectedItem.linkedService,
                        linkedHirePage: selectedItem.linkedHirePage,
                        linkedType: selectedItem.linkedType,
                        isAutoManaged: selectedItem.isAutoManaged
                    }}
                    onSuccess={handleEditSuccess}
                />
            )}
            {selectedItem && (
                <DeleteSeoManagerDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    seoManager={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )} */}
        </div>
    );
}