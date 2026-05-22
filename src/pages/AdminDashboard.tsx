// src/pages/AdminDashboard.tsx
// CHANGES from original:
// 1. Added: import LaborManagement from './LaborManagement';
// 2. Added: 'labor' case in header title/subtitle block
// 3. Added: {activeTab === 'labor' && <LaborManagement />} in content area
// 4. Added: Labor quick action button in dashboard overview
// Everything else is UNCHANGED

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Sidebar from '@/components/admin/Sidebar';
import BlogManager from '@/components/admin/BlogManager';
import EventManager from '@/components/admin/EventManager';
import Querymanager from '@/components/admin/Querymanager';
import LaborManagement from '@/pages/LaborManagement'; // ← NEW IMPORT

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalQueries: 0,
    pendingQueries: 0,
    totalLaborers: 0,   // ← NEW STAT
    activeLaborers: 0,  // ← NEW STAT
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);

        // Fetch Blogs
        const blogsSnapshot = await getDocs(collection(db, 'blogs'));
        const totalBlogs = blogsSnapshot.size;
        const publishedBlogs = blogsSnapshot.docs.filter(
          doc => doc.data().published === true
        ).length;

        // Fetch Events
        const eventsSnapshot = await getDocs(collection(db, 'events'));
        const totalEvents = eventsSnapshot.size;
        const upcomingEvents = eventsSnapshot.docs.filter(doc => {
          const eventDate = doc.data().eventDate?.toDate();
          return eventDate && eventDate >= new Date();
        }).length;

        // Fetch Queries
        const queriesSnapshot = await getDocs(collection(db, 'queries'));
        const totalQueries = queriesSnapshot.size;
        const pendingQueries = queriesSnapshot.docs.filter(
          doc => doc.data().status === 'pending'
        ).length;

        // ← NEW: Fetch Laborers
        const laborersSnapshot = await getDocs(collection(db, 'laborers'));
        const totalLaborers = laborersSnapshot.size;
        const activeLaborers = laborersSnapshot.docs.filter(
          doc => doc.data().status === 'active'
        ).length;

        setStats({
          totalBlogs,
          publishedBlogs,
          totalEvents,
          upcomingEvents,
          totalQueries,
          pendingQueries,
          totalLaborers,   // ← NEW
          activeLaborers,  // ← NEW
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    if (user && isAdmin) {
      fetchStats();
    }
  }, [user, isAdmin, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'dashboard' && '📊 Dashboard Overview'}
              {activeTab === 'blogs' && '📝 Blog Management'}
              {activeTab === 'events' && '📅 Event Management'}
              {activeTab === 'queries' && '💬 Query Management'}
              {activeTab === 'labor' && '👷 Labor Management'} {/* ← NEW */}
            </h1>
            <p className="text-gray-600 mt-1">
              {activeTab === 'dashboard' && 'Welcome to your admin panel'}
              {activeTab === 'blogs' && 'Manage all your blog posts'}
              {activeTab === 'events' && 'Manage all your events'}
              {activeTab === 'queries' && 'Manage customer queries and inquiries'}
              {activeTab === 'labor' && 'Register, manage and track all workers'} {/* ← NEW */}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsLoading ? (
                <div className="md:col-span-3 flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading statistics...</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Total Blogs</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalBlogs}</p>
                        <p className="text-xs text-green-600 mt-1">{stats.publishedBlogs} Published</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Total Events</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEvents}</p>
                        <p className="text-xs text-green-600 mt-1">{stats.upcomingEvents} Upcoming</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Total Queries</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalQueries}</p>
                        <p className="text-xs text-orange-600 mt-1">{stats.pendingQueries} Pending</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">💬</span>
                      </div>
                    </div>
                  </div>

                  {/* ← NEW: Labor stat card */}
                  <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Total Workers</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLaborers}</p>
                        <p className="text-xs text-green-600 mt-1">{stats.activeLaborers} Active</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👷</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Quick Actions */}
              <div className="md:col-span-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-sm border p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="bg-white hover:bg-gray-50 border-2 border-orange-200 rounded-lg p-4 text-left transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">📝</span>
                      <div>
                        <p className="font-semibold text-gray-900">Create New Blog</p>
                        <p className="text-sm text-gray-600">Write and publish blog posts</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('events')}
                    className="bg-white hover:bg-gray-50 border-2 border-green-200 rounded-lg p-4 text-left transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">📅</span>
                      <div>
                        <p className="font-semibold text-gray-900">Create New Event</p>
                        <p className="text-sm text-gray-600">Schedule upcoming events</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('queries')}
                    className="bg-white hover:bg-gray-50 border-2 border-purple-200 rounded-lg p-4 text-left transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">💬</span>
                      <div>
                        <p className="font-semibold text-gray-900">View Queries</p>
                        <p className="text-sm text-gray-600">Manage customer inquiries</p>
                      </div>
                    </div>
                  </button>

                  {/* ← NEW: Labor quick action */}
                  <button
                    onClick={() => setActiveTab('labor')}
                    className="bg-white hover:bg-gray-50 border-2 border-amber-200 rounded-lg p-4 text-left transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">👷</span>
                      <div>
                        <p className="font-semibold text-gray-900">Labor Management</p>
                        <p className="text-sm text-gray-600">Register & manage workers</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Pending Queries Alert */}
              {!statsLoading && stats.pendingQueries > 0 && (
                <div className="md:col-span-3 bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">⚠️ Pending Actions</h3>
                    <button
                      onClick={() => setActiveTab('queries')}
                      className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-800">
                      You have <span className="font-bold">{stats.pendingQueries}</span> pending customer{' '}
                      {stats.pendingQueries === 1 ? 'query' : 'queries'} awaiting response.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'blogs' && <BlogManager />}
          {activeTab === 'events' && <EventManager />}
          {activeTab === 'queries' && <Querymanager />}
          {activeTab === 'labor' && <LaborManagement />} {/* ← NEW */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;