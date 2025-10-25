// CoursesList.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming React Router for navigation
import { 
  Instagram, 
  DollarSign, 
  Video, 
  Search, 
  Brain, 
  BarChart3, 
  Activity, 
  Mail 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Courses data extracted from the PDF
const courses = [
  {
    id: 1,
    icon: Instagram,
    title: "Social Media Strategy & Planning (SMM)",
    tagline: "Craft strategies that connect and convert your audience",
    features: [
      "Social Media Ecosystem Overview",
      "Brand Personality Building",
      "Audience Persona Creation",
      "Competitor & Trend Analysis",
    ],
    gradient: "from-pink-500 to-purple-500",
    fullContent: [
      "Understanding Social Media Ecosystem (Facebook, Insta, LinkedIn, X, YouTube)",
      "Building Brand Personality & Voice",
      "Audience Persona Creation (Targeting the Right Tribe)",
      "Competitor & Trend Analysis",
      "Social Media Calendar Planning",
      "Organic vs Paid Strategy",
      "Campaign Objective Mapping (Awareness, Engagement, Conversion)",
      "KPI Setting & Performance Tracking"
    ]
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Facebook & Instagram Ads Mastery (Paid Media)",
    tagline: "Master Meta ads to drive targeted growth and ROI",
    features: [
      "Meta Ads Manager Deep Dive",
      "Custom & Lookalike Audiences",
      "Ad Copywriting Best Practices",
      "A/B Testing & Optimization",
    ],
    gradient: "from-blue-500 to-cyan-500",
    fullContent: [
      "Meta Ads Manager Deep Dive",
      "Setting Campaign Goals & Ad Structures",
      "Custom Audience, Lookalike Audience Creation",
      "Ad Copywriting & Visual Best Practices",
      "A/B Testing & Budget Optimization",
      "Pixel Setup & Conversion Tracking",
      "Retargeting Strategies",
      "Analyzing Campaign Reports & Scaling"
    ]
  },
  {
    id: 3,
    icon: Video,
    title: "Advanced Content Creation (Reels & Short Videos)",
    tagline: "Create captivating short-form content that hooks and holds",
    features: [
      "Hook Formula in 3 Seconds",
      "Storyboarding & Scriptwriting",
      "Mobile Editing Mastery",
      "Trending Audio Insights",
    ],
    gradient: "from-orange-500 to-red-500",
    fullContent: [
      "Hook Formula: Capturing Attention in 3 Seconds",
      "Storyboarding & Scriptwriting for Short Form Content",
      "Filming Techniques (Angles, Lighting, Transitions)",
      "Mobile Editing Mastery (CapCut, VN, InShot)",
      "Trending Audio & Algorithm Insights",
      "Branding through Reels – Colors, Fonts, Mood",
      "Posting Schedule & Engagement Tactics",
      "Analytics for Content Performance"
    ]
  },
  {
    id: 4,
    icon: Search,
    title: "Google Ads (PPC) & Search Engine Marketing (SEM)",
    tagline: "Unlock search power with precise PPC campaigns",
    features: [
      "Campaign Setup & Keyword Research",
      "Quality Score Optimization",
      "High-Converting Ad Copies",
      "Remarketing Strategies",
    ],
    gradient: "from-green-500 to-emerald-500",
    fullContent: [
      "Google Ads Interface & Campaign Setup",
      "Search Ads, Display Ads, Video Ads, & Shopping Ads",
      "Keyword Research & Match Types",
      "Quality Score & Ad Rank Optimization",
      "Writing High-Converting Ad Copies",
      "Conversion Tracking with Tags & Analytics",
      "Remarketing & Audience Segmentation",
      "Budget Optimization & Performance Review"
    ]
  },
  {
    id: 5,
    icon: Brain,
    title: "AI for Marketers (Artificial Intelligence Tools & Automation)",
    tagline: "Leverage AI to supercharge your marketing workflows",
    features: [
      "AI Role in Modern Marketing",
      "Content Creation with ChatGPT & Jasper",
      "Predictive Analytics Tracking",
      "Automation with Zapier",
    ],
    gradient: "from-purple-500 to-pink-500",
    fullContent: [
      "Understanding AI’s Role in Modern Marketing",
      "ChatGPT, Jasper, Copy.ai for Content Creation",
      "Canva Magic Studio & AI Image Tools",
      "Predictive Analytics & Customer Behavior Tracking",
      "Automation Workflows with Zapier & Make.com",
      "AI in Ad Copy, SEO, and Email Marketing",
      "Ethical AI Usage in Digital Strategy"
    ]
  },
  {
    id: 6,
    icon: Search,
    title: "Search Engine Optimization (SEO) Masterclass",
    tagline: "Optimize for visibility and dominate search rankings",
    features: [
      "On-Page & Off-Page SEO",
      "Technical SEO Essentials",
      "Keyword Research Tools",
      "Local SEO Optimization",
    ],
    gradient: "from-yellow-500 to-orange-500",
    fullContent: [
      "Understanding How Search Engines Work",
      "On-Page SEO (Titles, Meta Tags, Keyword Placement)",
      "Off-Page SEO (Backlinks, Guest Posts, Social Signals)",
      "Technical SEO (Sitemaps, Speed, Indexing, Mobile)",
      "Keyword Research (Tools like Ahrefs, SEMrush, Ubersuggest)",
      "Local SEO (Google My Business Optimization)",
      "Voice & Image Search Optimization",
      "Tracking & Reporting via Google Search Console"
    ]
  },
  {
    id: 7,
    icon: BarChart3,
    title: "Data Analytics & Reporting (Google Analytics 4 - GA4)",
    tagline: "Turn data into actionable insights for smarter decisions",
    features: [
      "GA4 Setup & Metrics",
      "Traffic Source Analysis",
      "Event Tracking & Goals",
      "Custom Reports Creation",
    ],
    gradient: "from-indigo-500 to-violet-500",
    fullContent: [
      "GA4 Setup & Dashboard Overview",
      "Understanding Metrics (Users, Sessions, Bounce Rate, Events)",
      "Traffic Source Analysis",
      "Audience Behavior Tracking",
      "Event Tracking & Conversion Goals",
      "Integrating GA4 with Google Ads",
      "Creating Custom Reports & Dashboards",
      "Data Interpretation for Strategy Decisions"
    ]
  },
  {
    id: 8,
    icon: Mail,
    title: "Email Marketing & Automation",
    tagline: "Build lasting connections through personalized email journeys",
    features: [
      "List Building & Segmentation",
      "High-Converting Campaigns",
      "Subject Line Psychology",
      "Drip Campaigns & Flows",
    ],
    gradient: "from-teal-500 to-sky-500",
    fullContent: [
      "Building & Segmenting Email Lists",
      "Crafting High-Converting Email Campaigns",
      "Subject Line Psychology",
      "Designing Responsive Templates (Mailchimp, Sender, Brevo)",
      "A/B Testing for Email Optimization",
      "Drip Campaigns & Automation Flows",
      "Email Deliverability & Spam Filters",
      "Performance Analysis (Open Rate, CTR, Conversion)"
    ]
  },
];

const CoursesList = () => {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <section id="courses" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Digital Media Courses
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master digital marketing domains with Shell Entertainment's comprehensive courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Card
              key={course.id}
              className="group hover:shadow-blue transition-all duration-300 border-border hover:border-primary bg-background animate-scale-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCourseClick(course)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <course.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-primary/80 italic font-medium">
                  "{course.tagline}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Badge className="mt-4 bg-primary/10 text-primary border-primary/20 pointer-events-none">Enroll Now</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesList;