// src/components/BlogSection.tsx
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const q = query(
        collection(db, 'blogs'),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Blog));
      
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs');
      // Mobile ke liye error log
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        console.log('Mobile device detected - Firebase error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state - mobile-friendly spinner
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 min-h-[300px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading blogs...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 md:py-16 bg-gray-50 min-h-[200px]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchBlogs}
            className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // No blogs - don't render section
  if (blogs.length === 0) return null;

  return (
    <section 
      id="blogs" 
      className="py-12 md:py-16 bg-gradient-to-b from-white to-orange-50/30"
      itemScope 
      itemType="https://schema.org/Blog"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Latest <span className="text-orange-600">Blogs</span>
          </h2>
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-600 mx-auto mb-3 md:mb-4"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
            Stay updated with our latest insights and stories
          </p>
        </div>

        {/* Grid - Mobile responsive fix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => handleBlogClick(blog.id)}
              className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-orange-100 cursor-pointer flex flex-col"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              {/* Card Header - Mobile height fix */}
              <div className="h-40 md:h-48 bg-gradient-to-br from-orange-400 to-amber-500 relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
                  <h3 
                    className="text-lg md:text-xl font-bold text-white line-clamp-2"
                    itemProp="headline"
                  >
                    {blog.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                {blog.excerpt && (
                  <p 
                    className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 line-clamp-3 flex-grow"
                    itemProp="description"
                  >
                    {blog.excerpt}
                  </p>
                )}

                {/* Meta info */}
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 mt-auto flex-wrap">
                  {blog.author && (
                    <div className="flex items-center gap-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <User className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate max-w-[100px]" itemProp="name">{blog.author}</span>
                    </div>
                  )}
                  {blog.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <time 
                        dateTime={new Date(blog.createdAt.seconds * 1000).toISOString()}
                        itemProp="datePublished"
                      >
                        {new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
                          day: 'numeric', 
                          month: 'short',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button 
                  className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group/btn mt-2 text-sm md:text-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlogClick(blog.id);
                  }}
                  aria-label={`Read full article: ${blog.title}`}
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
