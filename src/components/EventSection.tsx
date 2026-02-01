// src/components/EventSection.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, Clock, MapPin, ArrowRight, Bell, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  createdAt: any;
  published: boolean;
}

const EventSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Fetch published events (latest 15 for widget)
      const q = query(
        collection(db, 'events'),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(15)
      );
      
      const querySnapshot = await getDocs(q);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));
      
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get day and month for calendar icon
  const getDateParts = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()
    };
  };

  // Filter only future events for full section
  const upcomingEvents = events.filter(event => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    return eventDate >= today;
  });

  return (
    <>
      {/* Floating Notification Widget - Top Right */}
      {showWidget && events.length > 0 && !loading && (
       <div className="hidden lg:block fixed top-20 right-6 z-[60] w-80 animate-slide-in-right">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border-2 border-orange-200 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">Latest Updates</h3>
                  <p className="text-white/80 text-xs">Stay informed</p>
                </div>
              </div>
              <button
                onClick={() => setShowWidget(false)}
                className="text-white/80 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Notifications List - Scrollable */}
            <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="divide-y divide-gray-100">
                {events.map((event) => {
                  const dateParts = getDateParts(event.date);
                  
                  return (
                    <div
                      key={event.id}
                      className="p-4 hover:bg-orange-50 transition-colors cursor-default group"
                    >
                      <div className="flex gap-3">
                        {/* Date Badge - Compact */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex flex-col items-center justify-center text-white shadow-md">
                          <span className="text-[9px] font-semibold">{dateParts.month}</span>
                          <span className="text-lg font-bold leading-none">{dateParts.day}</span>
                        </div>

                        {/* Event Info - Compact */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors">
                            {event.title}
                          </h4>
                          
                          {/* Quick Details */}
                          <div className="space-y-1">
                            {event.time && (
                              <p className="text-xs text-gray-600 flex items-center gap-1">
                                <Clock className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{event.time}</span>
                              </p>
                            )}
                            {event.location && (
                              <p className="text-xs text-gray-600 flex items-center gap-1">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer - Count */}
            <div className="bg-gray-50 px-4 py-3 text-center border-t border-gray-200">
              <p className="text-xs text-gray-600 font-medium">
                {events.length} {events.length === 1 ? 'Announcement' : 'Announcements'}
              </p>
            </div>
          </div>

          {/* Custom Scrollbar Styles */}
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(0, 0, 0, 0.05);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(251, 146, 60, 0.4);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(251, 146, 60, 0.6);
            }
            
            @keyframes slide-in-right {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            
            .animate-slide-in-right {
              animation: slide-in-right 0.5s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Full Events Section - For Detailed Future Events */}
      {upcomingEvents.length > 0 && (
        <section id="events" className="py-16 bg-gradient-to-b from-orange-50/30 to-white">
          <div className="container mx-auto px-4">
           
           
                
            {/* View All Button - if more than 6 events */}
            {upcomingEvents.length > 6 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All Events
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default EventSection;