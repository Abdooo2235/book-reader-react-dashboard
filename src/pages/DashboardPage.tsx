import { Book, Users, FolderOpen, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/types';

// Mock data based on actual backend seeders
// Categories: 15 (Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Romance, Biography, Self-Help, History, Technology, Philosophy, Poetry, Drama, Children, Young Adult)
// Books: 8 approved + some pending/rejected for testing  
// Users: 1 admin + some regular users
const MOCK_STATS: DashboardStats = {
  total_users: 5,
  total_books: 10,
  approved_books: 8,
  pending_books: 1,
  rejected_books: 1,
  total_categories: 15,
};

const DashboardPage = () => {
  const stats: DashboardStats = MOCK_STATS;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total_users,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Books',
      value: stats.total_books,
      icon: Book,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Approved Books',
      value: stats.approved_books,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Pending Books',
      value: stats.pending_books,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Rejected Books',
      value: stats.rejected_books,
      icon: XCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Categories',
      value: stats.total_categories,
      icon: FolderOpen,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Book Reader admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
