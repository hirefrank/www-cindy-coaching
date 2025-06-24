import React, { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Brain-Body Strategies for Better Focus",
    excerpt: "Discover how movement and sensory strategies can improve attention and concentration for individuals with ADHD.",
    category: "ADHD Strategies",
    publishedAt: "March 15, 2024",
    featured: true
  },
  {
    id: 2,
    title: "Supporting Your ADHD Child Through Homework Battles",
    excerpt: "Practical tips for parents to reduce homework stress and create supportive learning environments at home.",
    category: "Parent Resources",
    publishedAt: "March 10, 2024",
    featured: false
  },
  {
    id: 3,
    title: "Understanding Executive Function in the Classroom",
    excerpt: "A guide for teachers on recognizing and supporting students with executive function challenges.",
    category: "Classroom/Educational Support",
    publishedAt: "March 5, 2024",
    featured: false
  },
  {
    id: 4,
    title: "Sensory Processing and ADHD: What Parents Need to Know",
    excerpt: "Exploring the connection between sensory processing differences and ADHD, with practical strategies for daily life.",
    category: "Autism Support",
    publishedAt: "February 28, 2024",
    featured: true
  },
  {
    id: 5,
    title: "Building Independence in Teens with ADHD",
    excerpt: "Strategies for helping neurodiverse teenagers develop self-advocacy skills and prepare for adulthood.",
    category: "Executive Function",
    publishedAt: "February 20, 2024",
    featured: false
  },
  {
    id: 6,
    title: "Creating ADHD-Friendly Workspaces",
    excerpt: "Design principles and organizational strategies for adults with ADHD in professional environments.",
    category: "ADHD Strategies",
    publishedAt: "February 15, 2024",
    featured: false
  }
];

const categories = [
  "All",
  "ADHD Strategies",
  "Autism Support", 
  "Executive Function",
  "Parent Resources",
  "Classroom/Educational Support"
];

export default function ResourcesFilter({ blogPosts = defaultBlogPosts, categories = defaultCategories }: ResourcesFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories = ["All", ...categories];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-48">
        <div className="flex flex-col md:flex-row gap-24 mb-32">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 px-4 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                selectedCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'border border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {selectedCategory === "All" && (
        <div className="mb-64">
          <h2 className="mb-32">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="p-32">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-24 flex items-center justify-center">
                    <p className="text-muted-foreground">Article Image</p>
                  </div>
                  <div className="flex items-center gap-12 mb-16">
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">{post.category}</span>
                    <span className="text-sm text-muted-foreground">{post.publishedAt}</span>
                  </div>
                  <h3 className="mb-16">{post.title}</h3>
                  <p className="text-muted-foreground mb-24 leading-relaxed">{post.excerpt}</p>
                  <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Posts Grid */}
      <div>
        <h2 className="mb-32">
          {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-card rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="p-24">
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-20 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Article Image</p>
                </div>
                <div className="flex items-center gap-8 mb-12">
                  <span className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                </div>
                <h3 className="text-lg mb-12">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-20 leading-relaxed">{post.excerpt}</p>
                <button className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-48">
          <p className="text-muted-foreground text-lg">
            No articles found matching your search criteria.
          </p>
          <button 
            onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
            className="mt-16 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}