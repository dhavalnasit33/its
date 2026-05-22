'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MoreHorizontal, PlusCircle, Trash2, Search, Sparkles, BookOpen, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import apiService from '@/lib/apiService';
import BulkDeleteSubcategoryDialog from '@/components/dashboard/subcategory/BulkDeleteSubcategory';
import DeleteSubcategoryDialog from '@/components/dashboard/subcategory/DeleteSUbcategoryDialog';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubCategoryItem {
    _id: string;
    category: string;
    categoryName: string;
    subcategory: string;
    moduleType: "services" | "blogs" | "hire";
    createdAt?: string;
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

    // Search and filter states
    const [searchValue, setSearchValue] = useState("");
    const [moduleTypeFilter, setModuleTypeFilter] = useState("all");

    const isAllSelected = items.length > 0 && selectedIds.length === items.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

    // Premium Module Type Badge Helper matching enquiries style for high contrast visibility
    const getModuleBadge = (moduleType: string) => {
        switch (moduleType) {
            case "services":
                return (
                    <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        <Sparkles className="h-3.5 w-3.5" />
                        services
                    </div>
                );
            case "blogs":
                return (
                    <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        <BookOpen className="h-3.5 w-3.5" />
                        blogs
                    </div>
                );
            case "hire":
                return (
                    <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        <Briefcase className="h-3.5 w-3.5" />
                        hire
                    </div>
                );
            default:
                return (
                    <div className="flex items-center gap-1.5 text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        {moduleType || 'N/A'}
                    </div>
                );
        }
    };

    const fetchItems = async (page = 1, search = "", moduleType = "all") => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
            });
            if (search) {
                query.append("search", search);
            }
            if (moduleType && moduleType !== "all") {
                query.append("moduleType", moduleType);
            }

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

    // Debounce search input and handle category fetching
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchItems(pagination.current, searchValue, moduleTypeFilter);
        }, 300);
        return () => clearTimeout(timer);
    }, [pagination.current, searchValue, moduleTypeFilter]);

    useEffect(() => {
        setSelectedIds([]);
    }, [searchValue, moduleTypeFilter]);

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
        fetchItems(pagination.current, searchValue, moduleTypeFilter);
    };

    const handleBulkDeleteSuccess = () => {
        setSelectedIds([]);
        setBulkDeleteDialogOpen(false);
        fetchItems(pagination.current, searchValue, moduleTypeFilter);
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
                        <Button onClick={() => router.push('/dashboard/subcategory/create')}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </div>
                }
            />

            {/* Premium Search and Filtering Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div className="flex flex-1 items-center gap-3 max-w-2xl">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search subcategory name..."
                            className="pl-8 w-full"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                                setPagination((prev) => ({ ...prev, current: 1 }));
                            }}
                        />
                    </div>

                    {/* Module Filter */}
                    <div className="w-[180px]">
                        <Select
                            value={moduleTypeFilter}
                            onValueChange={(value) => {
                                setModuleTypeFilter(value);
                                setPagination((prev) => ({ ...prev, current: 1 }));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Modules" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Modules</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="blogs">Blogs</SelectItem>
                                <SelectItem value="hire">Hire Page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {selectedIds.length > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => setBulkDeleteDialogOpen(true)}
                        className="flex items-center gap-2 flex-shrink-0"
                    >
                        <Trash2 className="h-4 w-4" />
                        Delete Selected ({selectedIds.length})
                    </Button>
                )}
            </div>

            <div className="rounded-md shadow-sm border">
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
                            <TableHead>Subcategory Name</TableHead>
                            <TableHead>Parent Category</TableHead>
                            <TableHead>Module Assignment</TableHead>
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
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-10 ml-auto" /></TableCell>
                                </TableRow>
                            ))
                        ) : items.length > 0 ? (
                            items.map((item) => (
                                <TableRow
                                    key={item._id}
                                    className={`border hover:bg-gray-100  ${selectedIds.includes(item._id) ? 'bg-gray-300' : ''
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
                                    <TableCell className="font-medium text-slate-800">{item.subcategory}</TableCell>
                                    <TableCell className="text-slate-600">{item.categoryName || 'N/A'}</TableCell>
                                    <TableCell>
                                        {getModuleBadge(item.moduleType)}
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
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    No subcategories found.
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

            {selectedItem && (
                <DeleteSubcategoryDialog
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