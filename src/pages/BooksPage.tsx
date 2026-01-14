import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Book } from '@/types';

// Mock data based on backend BookSeeder.php
const MOCK_BOOKS: Book[] = [
  {
    id: 1,
    title: 'Learn Flutter Development',
    author: 'John Doe',
    description: 'A comprehensive guide to building mobile apps with Flutter and Dart.',
    category_id: 1,
    category: { id: 1, name: 'Programming', created_at: '', updated_at: '' },
    pages: 350,
    file_type: 'pdf',
    file_path: '/books/flutter.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    submitted_by: { id: 1, name: 'Admin', email: 'admin@bookreader.com', role: 'admin', email_verified_at: null, created_at: '', updated_at: '' },
    downloads_count: 156,
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 2,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share.',
    category_id: 1,
    category: { id: 1, name: 'Programming', created_at: '', updated_at: '' },
    pages: 176,
    file_type: 'pdf',
    file_path: '/books/js.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 234,
    created_at: '2025-01-09T10:00:00Z',
    updated_at: '2025-01-09T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 3,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.',
    category_id: 2,
    category: { id: 2, name: 'Fiction', created_at: '', updated_at: '' },
    pages: 180,
    file_type: 'epub',
    file_path: '/books/gatsby.epub',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 89,
    created_at: '2025-01-08T10:00:00Z',
    updated_at: '2025-01-08T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 4,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    description: 'A landmark volume in science writing by one of the great minds of our time.',
    category_id: 3,
    category: { id: 3, name: 'Science', created_at: '', updated_at: '' },
    pages: 256,
    file_type: 'pdf',
    file_path: '/books/time.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 312,
    created_at: '2025-01-07T10:00:00Z',
    updated_at: '2025-01-07T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 5,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: 'A groundbreaking narrative of humanity creation and evolution.',
    category_id: 4,
    category: { id: 4, name: 'History', created_at: '', updated_at: '' },
    pages: 443,
    file_type: 'pdf',
    file_path: '/books/sapiens.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 278,
    created_at: '2025-01-06T10:00:00Z',
    updated_at: '2025-01-06T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 6,
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'An easy and proven way to build good habits and break bad ones.',
    category_id: 5,
    category: { id: 5, name: 'Self-Help', created_at: '', updated_at: '' },
    pages: 320,
    file_type: 'pdf',
    file_path: '/books/habits.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 445,
    created_at: '2025-01-05T10:00:00Z',
    updated_at: '2025-01-05T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 7,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'A handbook of agile software craftsmanship.',
    category_id: 1,
    category: { id: 1, name: 'Programming', created_at: '', updated_at: '' },
    pages: 464,
    file_type: 'pdf',
    file_path: '/books/clean.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 523,
    created_at: '2025-01-04T10:00:00Z',
    updated_at: '2025-01-04T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 8,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    description: 'Your journey to mastery in software development.',
    category_id: 1,
    category: { id: 1, name: 'Programming', created_at: '', updated_at: '' },
    pages: 352,
    file_type: 'pdf',
    file_path: '/books/pragmatic.pdf',
    cover_image: null,
    status: 'approved',
    user_id: 1,
    downloads_count: 387,
    created_at: '2025-01-03T10:00:00Z',
    updated_at: '2025-01-03T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 9,
    title: 'React Design Patterns',
    author: 'Michael Johnson',
    description: 'Modern patterns for building scalable React applications.',
    category_id: 1,
    category: { id: 1, name: 'Programming', created_at: '', updated_at: '' },
    pages: 280,
    file_type: 'pdf',
    file_path: '/books/react.pdf',
    cover_image: null,
    status: 'pending',
    user_id: 2,
    downloads_count: 0,
    created_at: '2025-01-12T10:00:00Z',
    updated_at: '2025-01-12T10:00:00Z',
    deleted_at: null,
  },
  {
    id: 10,
    title: 'Low Quality Book',
    author: 'Unknown Author',
    description: 'This book was rejected due to quality issues.',
    category_id: 2,
    category: { id: 2, name: 'Fiction', created_at: '', updated_at: '' },
    pages: 50,
    file_type: 'pdf',
    file_path: '/books/rejected.pdf',
    cover_image: null,
    status: 'rejected',
    user_id: 3,
    downloads_count: 0,
    created_at: '2025-01-11T10:00:00Z',
    updated_at: '2025-01-11T10:00:00Z',
    deleted_at: null,
  },
];

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  approved: 'bg-green-500/10 text-green-600 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const BooksPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);

  const filteredBooks = statusFilter === 'all'
    ? books
    : books.filter(book => book.status === statusFilter);

  const handleApprove = (bookId: number) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId ? { ...book, status: 'approved' as const } : book
    ));
  };

  const handleReject = (bookId: number) => {
    setBooks(prev => prev.map(book =>
      book.id === bookId ? { ...book, status: 'rejected' as const } : book
    ));
  };

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.title}</p>
          <p className="text-sm text-muted-foreground">{row.original.author}</p>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => row.original.category?.name ?? 'N/A',
    },
    {
      accessorKey: 'file_type',
      header: 'Type',
      cell: ({ row }) => (
        <Badge variant="secondary" className="uppercase">
          {row.original.file_type}
        </Badge>
      ),
    },
    {
      accessorKey: 'pages',
      header: 'Pages',
      cell: ({ row }) => row.original.pages,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge className={statusColors[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/books/${row.original.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            {row.original.status === 'pending' && (
              <>
                <DropdownMenuItem onClick={() => handleApprove(row.original.id)}>
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleReject(row.original.id)}>
                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredBooks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Books</h1>
          <p className="text-muted-foreground">Manage and moderate all books</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(status)}
            className="capitalize"
          >
            {status}
            {status !== 'all' && (
              <span className="ml-1 text-xs opacity-70">
                ({books.filter(b => b.status === status).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Book List ({filteredBooks.length} books)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t hover:bg-muted/50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {filteredBooks.length} books
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BooksPage;
