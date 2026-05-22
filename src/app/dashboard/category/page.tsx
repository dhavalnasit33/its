'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MoreHorizontal, PlusCircle, Trash2, Search, Sparkles, BookOpen, Briefcase, FolderHeart, HelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import PageHeader from '@/components/shared/PageHeader';
import apiService from '@/lib/apiService';
import { useToast } from '@/hooks/use-toast';
import DeletecategoryManageDialog from '@/components/dashboard/category/DeleteCategoryDialog';
import BulkDeletecategoryManagerDialog from '@/components/dashboard/category/BulkDeleteCategoryDiolog';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Category {
    _id: string;
    category: string;
    moduleType: "services" | "blogs" | "portfolio" | "faqs" | "hire";
    image?: string;
    createdAt: string;
}

export default function CategoryPage() {
    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<Category | null>(null);
    const [items, setItems] = useState<Category[]>([]);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Filter and Search States
    const [searchValue, setSearchValue] = useState("");
    const [moduleTypeFilter, setModuleTypeFilter] = useState("all");

    // Pagination State
    const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
    const [limit] = useState(10);

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
            case "portfolio":
                return (
                    <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        <FolderHeart className="h-3.5 w-3.5" />
                        portfolio
                    </div>
                );
            case "faqs":
                return (
                    <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit capitalize">
                        <HelpCircle className="h-3.5 w-3.5" />
                        faqs
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
                data: Category[];
                count: number;
                pagination: { current: number; pages: number; total: number };
            }>(`/category?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                if (res.pagination) {
                    setPagination(res.pagination);
                } else {
                    const total = res.count || res.data.length;
                    const pages = Math.ceil(total / limit);
                    setPagination({ current: page, pages: pages || 1, total });
                }
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
        if (selectedIds.length === items.length) setSelectedIds([]);
        else setSelectedIds(items.map((item) => item._id));
    };

    const handleDeleteDialogOpen = (item: Category) => {
        setSelectedItem(item);
        setDeleteDialogOpen(true);
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

    return (
        <>
            <PageHeader
                title="Category Manager"
                description="Manage all categories"
                actionButtons={
                    <div className="flex items-center gap-2">
                        <Button 
                            onClick={() => router.push("/dashboard/category/create")}>
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
                            placeholder="Search category name..."
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
                                <SelectItem value="portfolio">Portfolio</SelectItem>
                                <SelectItem value="faqs">FAQs</SelectItem>
                                <SelectItem value="hire">Hire Page</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

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
            </div>

            <div className="rounded-md shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-100">
                            <TableHead className="w-10">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                                    onChange={handleSelectAll}
                                    className="cursor-pointer w-4 h-4"
                                />
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead>Module Assignment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading
                             ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                                    <TableCell><Skeleton className="h-10 w-10 rounded" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))
                            : items.length > 0
                                ? items.map((item) => (
                                    <TableRow
                                        key={item._id}
                                        className={`border hover:bg-gray-100 ${selectedIds.includes(item._id) ? "bg-gray-200" : ""}`}
                                    >
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item._id)}
                                                onChange={() => handleCheckboxChange(item._id)}
                                                className="cursor-pointer w-4 h-4"
                                            />
                                        </TableCell>

                                        <TableCell>
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.category}
                                                    className="rounded object-cover w-11 h-11"
                                                />
                                            ) : (
                                                <div className="w-11 h-11 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                                                    No img
                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell className="font-medium text-slate-800">{item.category}</TableCell>

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
                                                            router.push(`/dashboard/category/${item._id}/edit`);
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
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No categories found.
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
                <DeletecategoryManageDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    item={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )}

            <BulkDeletecategoryManagerDialog
                isOpen={bulkDeleteDialogOpen}
                onOpenChange={setBulkDeleteDialogOpen}
                selectedIds={selectedIds}
                onSuccess={handleBulkDeleteSuccess}
            />
        </>
    );
}