import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO = ({ 
  title = "Shell Entertainment - Entertainment Reimagined for the Future",
  description = "Shell Entertainment empowers creators, learners, and dreamers to grow through creativity. We offer social media strategy, digital marketing, graphic design, and comprehensive learning programs.",
  keywords = "shell entertainment, digital marketing, social media strategy, graphic design, influencer management, creative courses, branding, campaigns, Mumbai"
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;