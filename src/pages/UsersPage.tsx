import { User, Mail, Calendar, Shield } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { User as UserType } from '@/types';

// Mock data based on backend AdminSeeder and realistic user data
const MOCK_USERS: UserType[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@bookreader.com',
    role: 'admin',
    email_verified_at: '2025-01-01T10:00:00Z',
    created_at: '2025-01-01T10:00:00Z',
    updated_at: '2025-01-01T10:00:00Z',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    email_verified_at: '2025-01-05T10:00:00Z',
    created_at: '2025-01-05T10:00:00Z',
    updated_at: '2025-01-05T10:00:00Z',
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    email_verified_at: '2025-01-08T10:00:00Z',
    created_at: '2025-01-08T10:00:00Z',
    updated_at: '2025-01-08T10:00:00Z',
  },
  {
    id: 4,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    email_verified_at: null,
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
  },
  {
    id: 5,
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'user',
    email_verified_at: '2025-01-12T10:00:00Z',
    created_at: '2025-01-12T10:00:00Z',
    updated_at: '2025-01-12T10:00:00Z',
  },
];

const UsersPage = () => {
  const users = MOCK_USERS;

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: 'name',
      header: 'User',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            {row.original.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-muted-foreground">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
          <Shield className="mr-1 h-3 w-3" />
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'email_verified_at',
      header: 'Verified',
      cell: ({ row }) => (
        <Badge variant={row.original.email_verified_at ? 'default' : 'outline'}>
          {row.original.email_verified_at ? 'Verified' : 'Unverified'}
        </Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Registered',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(row.original.created_at).toLocaleDateString()}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const verifiedCount = users.filter(u => u.email_verified_at).length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">View all registered users</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <User className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <Mail className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-bold">{verifiedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <Shield className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-bold">{adminCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
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
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Showing {table.getRowModel().rows.length} of {users.length} users
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

export default UsersPage;
