// src/components/admin/QueryManager.tsx
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Trash2, 
  Phone, 
  Mail, 
  MessageSquare, 
  User, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
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

interface Query {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  createdAt: any;
}

const QueryManager = () => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch queries from Firebase
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'queries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const queriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Query[];
      
      setQueries(queriesData);
    } catch (error) {
      console.error('Error fetching queries:', error);
      toast({
        title: "Error",
        description: "Failed to load queries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  // Update query status
  const updateStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'resolved') => {
    try {
      await updateDoc(doc(db, 'queries', id), {
        status: newStatus
      });

      setQueries(queries.map(q => 
        q.id === id ? { ...q, status: newStatus } : q
      ));

      toast({
        title: "Status Updated",
        description: `Query marked as ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Delete query
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteDoc(doc(db, 'queries', deleteId));
      setQueries(queries.filter(q => q.id !== deleteId));
      
      toast({
        title: "Query Deleted",
        description: "Query has been removed successfully",
      });
    } catch (error) {
      console.error('Error deleting query:', error);
      toast({
        title: "Error",
        description: "Failed to delete query",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock },
      contacted: { color: 'bg-blue-100 text-blue-800 border-blue-300', icon: Phone },
      resolved: { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} border`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Stats calculation
  const stats = {
    total: queries.length,
    pending: queries.filter(q => q.status === 'pending').length,
    contacted: queries.filter(q => q.status === 'contacted').length,
    resolved: queries.filter(q => q.status === 'resolved').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading queries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Queries</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600 font-medium">Pending</p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Clock className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Contacted</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{stats.contacted}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Phone className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Resolved</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queries List */}
      {queries.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Queries Yet</h3>
            <p className="text-gray-500">Customer queries will appear here when submitted</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {queries.map((query) => (
            <Card key={query.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-orange-500">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left Section - Query Details */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {query.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-600" />
                            {query.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(query.createdAt)}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(query.status)}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href={`tel:${query.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">{query.phone}</span>
                      </a>
                      {query.email && (
                        <a 
                          href={`mailto:${query.email}`}
                          className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="font-medium">{query.email}</span>
                        </a>
                      )}
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message:
                      </p>
                      <p className="text-gray-800 leading-relaxed">{query.message}</p>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {query.status !== 'contacted' && (
                      <Button
                        onClick={() => updateStatus(query.id, 'contacted')}
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Mark Contacted
                      </Button>
                    )}
                    {query.status !== 'resolved' && (
                      <Button
                        onClick={() => updateStatus(query.id, 'resolved')}
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                    {query.status !== 'pending' && (
                      <Button
                        onClick={() => updateStatus(query.id, 'pending')}
                        variant="outline"
                        size="sm"
                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Mark Pending
                      </Button>
                    )}
                    <Button
                      onClick={() => setDeleteId(query.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this query from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QueryManager;