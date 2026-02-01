// src/components/BlogSection.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  createdAt: any;
  published: boolean;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'blogs'),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(6) // Limit to 6 items for the homepage section
      );
      
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Blog));
      
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (id: string) => {
    // Navigate to the detail page
    navigate(`/blog/${id}`);
    // Scroll to top for better UX
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-16 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest <span className="text-orange-600">Blogs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with our latest insights and stories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => handleBlogClick(blog.id)} // Click handler on whole card
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-orange-100 cursor-pointer flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="h-48 bg-gradient-to-br from-orange-400 to-amber-500 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {blog.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 mt-auto">
                  {blog.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">{blog.author}</span>
                    </div>
                  )}
                  {blog.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <button 
                  className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group/btn mt-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent double triggering
                    handleBlogClick(blog.id);
                  }}
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;