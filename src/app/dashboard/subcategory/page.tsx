'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MoreHorizontal, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import apiService from '@/lib/apiService';
import BulkDeleteSubcategoryDialog from '@/components/dashboard/subcategory/BulkDeleteSubcategory';
import DeletesubcategoryManageDialog from '@/components/dashboard/subcategory/DeleteSUbcategoryDialog';

interface SubCategoryItem {
    _id: string;
    category: string;
    categoryName: string;
    subcategory: string;
    createdAt?: string
}

export default function SubCategoryPage() {
    const [items, setItems] = useState<SubCategoryItem[]>([]);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
    const [limit] = useState(10);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SubCategoryItem | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

    const isAllSelected = items.length > 0 && selectedIds.length === items.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

    useEffect(() => {
        fetchItems(1);
    }, []);

    const fetchItems = async (page = 1) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
            });

            const res = await apiService<{
                success: boolean;
                data: SubCategoryItem[];
                pagination: { current: number; pages: number; total: number };
            }>(`/subcategory?${query.toString()}`, { method: 'GET' });

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

    const handleCheckboxChange = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === items.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(items.map((item) => item._id));
        }
    };

    const handleDeleteDialogChange = (open: boolean) => {
        if (!open) setSelectedItem(null);
        setDeleteDialogOpen(open);
    };

    const handleDeleteSuccess = () => {
        setDeleteDialogOpen(false);
        setSelectedIds((prev) => prev.filter((id) => id !== selectedItem?._id));
        fetchItems(pagination.current);
    };

    const handleBulkDeleteSuccess = () => {
        setSelectedIds([]);
        setBulkDeleteDialogOpen(false);
        fetchItems(pagination.current);
    };

    const handleDeleteDialogOpen = (item: SubCategoryItem) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
    };

    return (
        <>
            <PageHeader
                title="Subcategory Manager"
                description="Manage all subcategories"
                actionButtons={
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button
                                variant="destructive"
                                onClick={() => setBulkDeleteDialogOpen(true)}
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Selected ({selectedIds.length})
                            </Button>
                        )}
                        <Button onClick={() => router.push('/dashboard/subcategory/create')}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </div>
                }
            />

            <div className="rounded-md shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-200">
                            <TableHead className="w-10">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(el) => {
                                        if (el) el.indeterminate = isIndeterminate;
                                    }}
                                    onChange={handleSelectAll}
                                    className="cursor-pointer w-4 h-4"
                                />
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Subcategory</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-10 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className={`border hover:bg-gray-200 dark:border-gray-300 ${selectedIds.includes(item._id) ? 'bg-gray-300' : ''
                                        }`}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item._id)}
                                            onChange={() => handleCheckboxChange(item._id)}
                                            className="cursor-pointer w-4 h-4"
                                        />
                                    </TableCell>
                                    <TableCell>{item.subcategory}</TableCell>
                                    <TableCell>
                                        {item.categoryName || 'N/A'}
                                        {/* {item.category && typeof item.category === 'object'
                                            ? item.category.category
                                            : (item.category || "N/A")} */}
                                        {/* {item.category} */}
                                    </TableCell>
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
                                                        router.push(`/dashboard/subcategory/${item._id}/edit`);
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
                        ) : (
                            <TableRow className="hover:bg-gray-200">
                                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                    No subcategories found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            <div className="flex justify-between items-center gap-2 mt-4">
                <span className="text-sm">
                    Page {pagination.current} of {pagination.pages}
                    {selectedIds.length > 0 && (
                        <span className="ml-3 text-blue-600 font-medium">
                            {selectedIds.length} selected
                        </span>
                    )}
                </span>
                <div className="flex gap-3">
                    <Button
                        className="bg-blue-600 text-white"
                        disabled={pagination.current === 1}
                        onClick={() => fetchItems(pagination.current - 1)}
                    >
                        Previous
                    </Button>
                    <Button
                        className="bg-blue-600 text-white"
                        disabled={pagination.current === pagination.pages}
                        onClick={() => fetchItems(pagination.current + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {selectedItem && (
                <DeletesubcategoryManageDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    item={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )}

            <BulkDeleteSubcategoryDialog
                isOpen={bulkDeleteDialogOpen}
                onOpenChange={setBulkDeleteDialogOpen}
                selectedIds={selectedIds}
                onSuccess={handleBulkDeleteSuccess}
            />
        </>
    );
}