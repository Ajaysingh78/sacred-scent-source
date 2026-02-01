// src/pages/BlogPost.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeft, Calendar, User, Clock, Share2, Check } from 'lucide-react';
import { toast } from 'sonner'; // Using Sonner for better toasts

interface BlogData {
  title: string;
  content: string;
  author: string;
  createdAt: any;
  imageUrl?: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setBlog(docSnap.data() as BlogData);
        } else {
          toast.error("Blog not found!");
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Error loading blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id, navigate]);

  // Calculate Reading Time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 animate-pulse">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  // Format date
  const date = blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : '';

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-16">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 rounded-lg hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
        </nav>

        <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 overflow-hidden border border-gray-100">
          
          {/* Hero Section - Image or Gradient */}
          {blog.imageUrl ? (
            <div className="relative h-64 md:h-96 w-full">
              <img 
                src={blog.imageUrl} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                 <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                  {blog.title}
                </h1>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-8 md:p-16 text-white relative overflow-hidden">
               {/* Decorative Circles */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
               
               <div className="relative z-10">
                 <div className="flex flex-wrap gap-3 text-sm font-medium text-orange-100 mb-6">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      Blog Article
                    </span>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 shadow-black/5">
                  {blog.title}
                </h1>
               </div>
            </div>
          )}

          {/* Meta Data Bar */}
          <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
             <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-orange-500" />
                  <span className="font-medium text-gray-900">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <span>{getReadingTime(blog.content)}</span>
                </div>
             </div>

             <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors"
                title="Share Article"
             >
                {copied ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
             </button>
          </div>

          {/* Content Body */}
          <div className="p-8 md:p-16">
            <div className="prose prose-lg prose-orange max-w-none text-gray-700 leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-orange-600 first-letter:mr-3 first-letter:float-left">
              {blog.content}
            </div>

            {/* Footer / Call to Action */}
            <div className="mt-16 pt-8 border-t border-gray-100">
               <div className="bg-orange-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Interested in our products?</h3>
                    <p className="text-gray-600 text-sm">Get premium quality Agarbatti & Raw Materials directly from manufacturer.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/#contact')}
                    className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all hover:shadow-lg shadow-orange-500/20 whitespace-nowrap"
                  >
                    Contact Us
                  </button>
               </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;