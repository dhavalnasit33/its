"use client"
import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";


import type {  Faqs } from "@/types";
import { PlusCircle, MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react";
import apiService from "@/lib/apiService";
import CreateFaqsDialog from "@/components/dashboard/Faqs/CreateFaqsDialog";
import DeleteFaqsDialog from "@/components/dashboard/Faqs/DeleteFaqsDilog";
import BulkDeleteFAQDialog from "@/components/dashboard/Faqs/BulkDeleteFAQDialog";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
export interface Category {
  _id: string;
  category: string;
}

function page() {
    const router = useRouter();
    const [items, setItems] = useState<Faqs[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
    const [limit] = useState(10);

    // Search and filter state
    const [searchValue, setSearchValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);


    //Dialog states
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Faqs | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

    const fetchItems = async (
        page: number = 1,
        search = searchValue,
        category = selectedCategory,
        // subCategory = selectedSubCategory
    ) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search ? { value: search } : {}),
                ...(category ? { category } : {}),
                // ...(subCategory ? { subCategories: subCategory } : {}),
            });

            const res = await apiService<{
                success: boolean;
                data: Faqs[];
                pagination?: { current: number; pages: number; total: number };
            }>(`/faqs/admin?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                        if (res.pagination) setPagination(res.pagination);

            } else {
                setItems([]);
            }
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        if (!open) setSelectedItem(null);
        setDeleteDialogOpen(open);
    };

    const handleDeleteSuccess = () => {
        setDeleteDialogOpen(false);
        fetchItems(pagination.current, searchValue, selectedCategory);
    };

    const handleEditDialogOpen = (item: Faqs) => {
        router.push(`/dashboard/Faqs/${item._id}/edit`);
     };

    // --- 2. useEffect to trigger fetch on load ---
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchItems(pagination.current, searchValue, selectedCategory);
        }, 300);
        return () => clearTimeout(timer);
    }, [pagination.current, searchValue, selectedCategory]);

    useEffect(() => {
        setSelectedIds([]);
    }, [searchValue]);


    const handleDeleteDialogOpen = (item: Faqs) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
    };


    const handleBulkDeleteSuccess = () => {
        setSelectedIds([]);
        setBulkDeleteDialogOpen(false);
        fetchItems(pagination.current, searchValue, selectedCategory);
    };
    
    const toggleSelectAll = () => {
        if (selectedIds.length === items.length && items.length > 0) {
          setSelectedIds([]);
        } else {
          setSelectedIds(items.map((item) => item._id).filter((id): id is string => !!id));
        }
      };
    
      const toggleSelectItem = (id: string) => {
        setSelectedIds((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      };
      const stripHtml = (input: string) => input.replace(/<[^>]+>/g, "");


    return (
        <>
            <div>
                <PageHeader
                    title="Faqs"
                    description="Frequently Asked Questions"
                    actionButtons={
                        <div className="flex items-center gap-3">
            
                        <Link href="/dashboard/Faqs/create">
                            <Button
                            >
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Faqs
                            </Button>
                        </Link>
                        </div>
                    }
                    />
            </div>

            <div className="flex items-center justify-between gap-3 mb-4 mt-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by question..."
                        className="pl-8 w-full"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setPagination((prev) => ({ ...prev, current: 1 }));
                        }}
                    />
                </div>
                {selectedIds.length > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => setBulkDeleteDialogOpen(true)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Selected ({selectedIds.length})
                    </Button>
                )}
            </div>

            <div className="rounded-md  border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                    checked={selectedIds.length === items.length && items.length > 0}
                                    onChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="hidden xl:table-cell">Category</TableHead>
                            <TableHead>Question</TableHead>

                            <TableHead className="hidden xl:table-cell">Answer</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading
                            ? Array.from({ length: limit }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32 rounded" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                    <TableCell><Skeleton className="hidden xl:table-cell h-5 w-32" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                            : items.length > 0
                                ? items.map((item, index) => (
                                    <TableRow key={item._id} >
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300"
                                                checked={item._id ? selectedIds.includes(item._id) : false}
                                                onChange={() => item._id && toggleSelectItem(item._id)}
                                            />
                                        </TableCell>
                                        {/* <TableCell className="hidden xl:table-cell" >{item.categories}</TableCell> */}
                                        <TableCell className="hidden xl:table-cell">
                                            {typeof item.categories === "object" ? item.categories.category : "-"}
                                        </TableCell> 
                                        <TableCell className="max-w-30 xl:max-w-xs truncate">{stripHtml(item.title)}</TableCell>
                                        <TableCell className="max-w-30 xl:max-w-xs truncate" >{stripHtml(item.answer)}</TableCell>
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

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleEditDialogOpen(item);
                                                            setDropdownOpen(null);
                                                        }}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleDeleteDialogOpen(item);
                                                            setDropdownOpen(null);
                                                        }}
                                                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
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
                                        <TableCell colSpan={5} className="text-center h-24">
                                            No Faqs found. {searchValue || selectedCategory ? "Try adjusting your filters." : ""}
                                        </TableCell>
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

            <CreateFaqsDialog
                isOpen={dialogOpen}
                onOpenChange={setDialogOpen}
                onSuccess={() => fetchItems(pagination.current, searchValue, selectedCategory)}
            />

            {/* Delete Dialog */}
            {
                selectedItem && (
                    <DeleteFaqsDialog
                        isOpen={deleteDialogOpen}
                        onOpenChange={handleDeleteDialogChange}
                        faqsId={selectedItem._id}
                        onSuccess={handleDeleteSuccess}
                    />
                )
            }

            {/* Bulk Delete Dialog */}
            <BulkDeleteFAQDialog
                isOpen={bulkDeleteDialogOpen}
                onOpenChange={setBulkDeleteDialogOpen}
                selectedIds={selectedIds}
                onSuccess={handleBulkDeleteSuccess}
            />
        </>
    )
}

export default page;
