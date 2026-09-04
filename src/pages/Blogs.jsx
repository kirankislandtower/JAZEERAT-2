import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Clock, User, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import SectionLabel from '../components/SectionLabel'
import Cutline from '../components/Cutline'
import TiltImage from '../components/TiltImage'
import Newsletter from '../components/Newsletter'
import { getCategoryColor } from '../data/blogCategories'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    async function loadBlogs() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (!error && data && data.length > 0) {
          setBlogs(data)
        } else {
          setBlogs([])
        }
      } catch (err) {
        setBlogs([])
      }
      setLoading(false)
    }
    loadBlogs()
  }, [])

  // Filter blogs based on category
  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory)

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null
  const regularPosts = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : []

  const categories = ['All', 'Technical Insights', 'Industry News', 'Company Updates']

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="bg-graphite">
      <SEO
        title="Insights & News | Jazeerat Al Hadeed"
        description="Read our latest insights, case studies, and technical deep dives into structural steel fabrication, CNC processing, and site erection across the MENA region."
        path="/blogs"
      />

      {/* Hero Section */}
      <section className="pt-40 pb-16 lg:pt-48 lg:pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <SectionLabel index="INSIGHTS">Knowledge Base</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" custom={1} variants={fadeUp}
            className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-8xl leading-[0.9] text-steel-light max-w-4xl mt-6 mb-8"
          >
            The science of<br />
            <span className="text-white">structural steel.</span>
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="text-steel text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            Industry news, technical deep dives, and company updates from the team building the region's most critical infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-graphite pt-4 pb-12 relative z-20 border-b border-panel-line mb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap gap-4">
          {categories.map((cat) => {
            const activeClasses = cat === 'All' ? 'bg-white text-graphite' : getCategoryColor(cat)
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`font-mono text-xs uppercase tracking-widest px-6 py-3 font-bold relative transition-all duration-300 border ${
                  activeCategory === cat
                    ? `border-transparent ${activeClasses}`
                    : 'bg-transparent border-panel-line text-steel hover:border-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Cutline label="Articles" />
      </div>

      <section className="pb-20 lg:pb-32 bg-graphite relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="py-32 text-center">
              <span className="font-mono text-steel uppercase tracking-widest text-sm">Loading Articles...</span>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-32 text-center">
              <span className="font-mono text-steel uppercase tracking-widest text-sm">No articles found.</span>
            </div>
          ) : (
            <>
              {/* Featured Post (Editorial Style) */}
              {featuredPost && (
                <NavLink to={`/blogs/${featuredPost.slug}`} className="block group mb-20 lg:mb-32">
                  <motion.article 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={fadeUp}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                  >
                    <div className="relative h-[400px] lg:h-[600px] w-full rounded-sm z-0">
                      <TiltImage src={featuredPost.image_url} alt={featuredPost.title} loading="eager" />
                      <div className="absolute top-6 left-6 z-20 pointer-events-none">
                        <span className={`font-mono text-xs uppercase tracking-widest px-4 py-2 font-bold shadow-lg ${getCategoryColor(featuredPost.category)}`}>
                          {featuredPost.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4 mb-6 font-mono text-[11px] tracking-widest uppercase text-steel">
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-steel-light" /> {featuredPost.read_time}</span>
                        <span className="w-1 h-1 bg-panel-line rounded-full" />
                        <span className="flex items-center gap-1.5"><User size={14} className="text-steel-light" /> {featuredPost.author}</span>
                      </div>
                      
                      <h2 className="font-display font-extrabold uppercase text-4xl lg:text-6xl text-steel-light mb-6 leading-[1.05] group-hover:text-white transition-colors">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-steel text-lg lg:text-xl leading-relaxed mb-10 border-l-2 border-weld pl-6">
                        {featuredPost.excerpt}
                      </p>

                      <div className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-steel-light font-semibold group-hover:text-white transition-colors">
                        Read Featured Article 
                        <motion.div className="group-hover:translate-x-2 transition-transform">
                          <ArrowRight size={16} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                </NavLink>
              )}

              {/* Masonry-style Grid for Remaining Posts */}
              {regularPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {regularPosts.map((blog, i) => (
                    <NavLink key={blog.id} to={`/blogs/${blog.slug}`} className="block group">
                      <motion.article
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
                        custom={i % 3} variants={fadeUp}
                        className={`flex flex-col h-full ${i % 3 === 1 ? 'md:mt-12 lg:mt-24' : ''} ${i % 3 === 2 ? 'lg:mt-12' : ''}`}
                      >
                        <div className="relative aspect-[4/3] w-full mb-6 rounded-sm z-0">
                          <TiltImage src={blog.image_url} alt={blog.title} />
                          <div className="absolute top-4 left-4 z-20 pointer-events-none">
                            <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 font-bold shadow-lg ${getCategoryColor(blog.category)}`}>
                              {blog.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col flex-1">
                          <h3 className="font-display font-bold uppercase text-2xl lg:text-3xl text-steel-light mb-4 group-hover:text-white transition-colors leading-tight">
                            {blog.title}
                          </h3>
                          
                          <p className="text-steel text-base leading-relaxed mb-6 line-clamp-3 flex-1">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-6 border-t border-panel-line">
                            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-steel">
                              <span className="flex items-center gap-1.5"><Clock size={12} className="text-steel-light" /> {blog.read_time}</span>
                            </div>
                            <div className="text-steel-light group-hover:text-white group-hover:translate-x-1 transition-all">
                              <ArrowRight size={16} />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Newsletter />
    </motion.main>
  )
}
