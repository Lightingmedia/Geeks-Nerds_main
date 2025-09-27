export interface User {
  id: number;
  email: string;
  full_name: string;
  profile_picture: string;
  bio?: string;
  location?: string;
  skills?: string[];
  company?: string;
  job_title?: string;
  onboarding_completed?: boolean;
  is_owner?: boolean;
  is_admin?: boolean;
  is_super_admin?: boolean;
  owner_permissions?: {
    profile_management: boolean;
    content_creation: boolean;
    social_features: boolean;
    community_interaction: boolean;
    analytics_access: boolean;
    advanced_settings: boolean;
  };
  admin_permissions?: {
    user_management: boolean;
    content_moderation: boolean;
    system_settings: boolean;
    rss_management: boolean;
    analytics_dashboard: boolean;
  };
  age_range?: string;
  personality_traits?: string[];
  interests?: string[];
  communication_style?: string;
  expertise_level?: string;
  preferred_content?: string[];
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  post_type: string;
  code_language?: string;
  document_name?: string;
  resume_name?: string;
  document_url?: string;
  resume_url?: string;
  url_preview?: {
    url: string;
    title: string;
    description: string;
    image?: string;
    siteName?: string;
    favicon?: string;
  };
  created_at: string;
  likes_count: number;
  comments_count: number;
  full_name: string;
  profile_picture: string;
  job_title: string;
  company: string;
  image_description?: string;
  image_type?: string;
  is_rss_generated?: boolean;
  rss_source?: string;
}

// Super Administrator Account
export const superAdmin: User = {
  id: 1,
  email: 'bola.olatunji@gmail.com',
  full_name: 'Bola Olatunji',
  profile_picture: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  bio: 'Senior Full Stack Developer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable applications and mentoring junior developers.',
  location: 'Global',
  skills: ['Full Stack Development', 'Community Building', 'Tech Leadership', 'JavaScript', 'React'],
  company: 'Tech Innovations',
  job_title: 'Senior Full Stack Developer',
  onboarding_completed: true,
  is_owner: false,
  is_admin: true,
  is_super_admin: true,
  admin_permissions: {
    user_management: true,
    content_moderation: true,
    system_settings: true,
    rss_management: true,
    analytics_dashboard: true
  },
  age_range: '30-35',
  personality_traits: ['analytical', 'collaborative', 'problem-solver', 'innovative'],
  interests: ['full stack development', 'cloud architecture', 'tech innovation', 'mentoring', 'open source'],
  communication_style: 'technical and helpful, focuses on code quality and best practices',
  expertise_level: 'expert',
  preferred_content: ['technical tutorials', 'architecture discussions', 'development best practices', 'mentoring content']
};

// Pre-added system users (fictional users added by the system)
export const systemUsers: User[] = [
  {
    id: 2,
    email: 'sarah.tech@university.edu',
    full_name: 'Sarah Chen',
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Computer Science graduate from USC. Passionate about AI and machine learning applications in healthcare.',
    location: 'Los Angeles, CA',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'React', 'Node.js'],
    company: 'TechHealth Solutions',
    job_title: 'AI Engineer',
    onboarding_completed: true,
    is_owner: true,
    age_range: '24-28',
    personality_traits: ['analytical', 'innovative', 'collaborative', 'detail-oriented'],
    interests: ['AI/ML', 'healthcare tech', 'data science', 'research papers', 'tech conferences'],
    communication_style: 'technical but accessible, shares research insights and practical applications',
    expertise_level: 'intermediate',
    preferred_content: ['AI tutorials', 'research discussions', 'healthcare innovation', 'career advice']
  },
  {
    id: 3,
    email: 'marcus.dev@college.edu',
    full_name: 'Marcus Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Full-stack developer and UC Davis alumnus. Building scalable web applications and mentoring junior developers.',
    location: 'Davis, CA',
    skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    company: 'WebScale Inc',
    job_title: 'Senior Full Stack Developer',
    onboarding_completed: true,
    is_owner: true,
    age_range: '26-30',
    personality_traits: ['mentor', 'problem-solver', 'collaborative', 'patient'],
    interests: ['web development', 'mentoring', 'open source', 'system architecture', 'team leadership'],
    communication_style: 'helpful and educational, enjoys sharing knowledge and best practices',
    expertise_level: 'senior',
    preferred_content: ['coding tutorials', 'architecture discussions', 'mentoring tips', 'team management']
  },
  {
    id: 4,
    email: 'emily.code@calstate.edu',
    full_name: 'Emily Watson',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Recent Cal State LA graduate diving deep into software engineering. Love solving complex problems and learning new technologies.',
    location: 'Los Angeles, CA',
    skills: ['Java', 'Python', 'Spring Boot', 'React', 'Git', 'Agile'],
    company: 'StartupTech',
    job_title: 'Junior Software Engineer',
    onboarding_completed: true,
    is_owner: true,
    age_range: '22-25',
    personality_traits: ['curious', 'determined', 'enthusiastic', 'growth-minded'],
    interests: ['software engineering', 'coding challenges', 'tech meetups', 'career development', 'learning'],
    communication_style: 'enthusiastic and inquisitive, asks great questions and shares learning journey',
    expertise_level: 'junior',
    preferred_content: ['learning resources', 'coding challenges', 'career advice', 'beginner tutorials']
  },
  {
    id: 5,
    email: 'david.ai@ucr.edu',
    full_name: 'David Kim',
    profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'UC Riverside Engineering graduate specializing in computer vision and deep learning. Published researcher and tech conference speaker.',
    location: 'Riverside, CA',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV', 'CUDA', 'Research'],
    company: 'VisionAI Corp',
    job_title: 'Computer Vision Engineer',
    onboarding_completed: true,
    is_owner: true,
    age_range: '28-32',
    personality_traits: ['researcher', 'innovative', 'analytical', 'speaker'],
    interests: ['computer vision', 'deep learning', 'research', 'conferences', 'academic papers'],
    communication_style: 'academic but practical, shares cutting-edge research and real-world applications',
    expertise_level: 'expert',
    preferred_content: ['research papers', 'AI breakthroughs', 'conference talks', 'technical deep-dives']
  },
  {
    id: 6,
    email: 'jessica.security@concordia.edu',
    full_name: 'Jessica Martinez',
    profile_picture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Cybersecurity specialist from Concordia University. Protecting digital assets and educating others about security best practices.',
    location: 'Irvine, CA',
    skills: ['Cybersecurity', 'Penetration Testing', 'Python', 'Network Security', 'Incident Response'],
    company: 'SecureNet Solutions',
    job_title: 'Cybersecurity Analyst',
    onboarding_completed: true,
    is_owner: true,
    age_range: '25-29',
    personality_traits: ['vigilant', 'educator', 'ethical', 'detail-oriented'],
    interests: ['cybersecurity', 'ethical hacking', 'security education', 'threat analysis', 'privacy'],
    communication_style: 'security-focused, shares practical tips and raises awareness about threats',
    expertise_level: 'intermediate',
    preferred_content: ['security tutorials', 'threat alerts', 'best practices', 'privacy guides']
  },
  {
    id: 7,
    email: 'ryan.mobile@calbaptist.edu',
    full_name: 'Ryan Thompson',
    profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Mobile app developer and California Baptist University IT graduate. Creating beautiful, user-friendly mobile experiences.',
    location: 'Riverside, CA',
    skills: ['Swift', 'Kotlin', 'React Native', 'iOS', 'Android', 'UI/UX'],
    company: 'MobileFirst Studios',
    job_title: 'Mobile App Developer',
    onboarding_completed: true,
    is_owner: true,
    age_range: '24-28',
    personality_traits: ['creative', 'user-focused', 'perfectionist', 'innovative'],
    interests: ['mobile development', 'UI/UX design', 'app store optimization', 'user experience', 'design patterns'],
    communication_style: 'design-conscious, focuses on user experience and visual appeal',
    expertise_level: 'intermediate',
    preferred_content: ['mobile tutorials', 'design showcases', 'UX discussions', 'app reviews']
  },
  {
    id: 8,
    email: 'lisa.hardware@csudh.edu',
    full_name: 'Lisa Chang',
    profile_picture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Hardware engineer from CSU Dominguez Hills. Designing embedded systems and IoT solutions for smart cities.',
    location: 'Carson, CA',
    skills: ['Embedded Systems', 'C/C++', 'FPGA', 'IoT', 'Circuit Design', 'Arduino'],
    company: 'SmartCity Technologies',
    job_title: 'Embedded Systems Engineer',
    onboarding_completed: true,
    is_owner: false,
    age_range: '27-31',
    personality_traits: ['hands-on', 'systematic', 'innovative', 'problem-solver'],
    interests: ['embedded systems', 'IoT', 'smart cities', 'hardware design', 'maker projects'],
    communication_style: 'technical and practical, shares hands-on projects and engineering insights',
    expertise_level: 'senior',
    preferred_content: ['hardware tutorials', 'IoT projects', 'engineering insights', 'maker content']
  }
];

// All mock users (system users + super admin)
export const mockUsers: User[] = [
  superAdmin,
  ...systemUsers
];

// Signed up users (users who registered through the app)
export const signedUpUsers: User[] = [];

export const mockPosts: Post[] = [
  // User-generated posts
  {
    id: 101,
    user_id: 9,
    content: "Just deployed my first microservices architecture using Docker and Kubernetes! 🚀\n\nThe learning curve was steep, but the scalability benefits are incredible. Here's what I learned:\n\n✅ Container orchestration is a game-changer\n✅ Service mesh makes communication seamless\n✅ Auto-scaling saves costs and improves performance\n\nNext up: implementing CI/CD pipelines with GitLab!\n\n#DevOps #Kubernetes #Docker #Microservices",
    post_type: 'text',
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes_count: 67,
    comments_count: 18,
    full_name: 'Alex Thompson',
    profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'DevOps Engineer',
    company: 'CloudTech Solutions'
  },
  {
    id: 102,
    user_id: 10,
    content: "Excited to share my latest React component library! 📚⚡\n\nAfter months of development, I've created a comprehensive UI kit with:\n\n🎨 50+ customizable components\n🌙 Dark/light theme support\n📱 Mobile-first responsive design\n♿ Full accessibility compliance\n🎯 TypeScript support\n\nOpen source and ready for production use!\n\n#React #OpenSource #UIKit #TypeScript #WebDev",
    post_type: 'text',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes_count: 143,
    comments_count: 32,
    full_name: 'Maya Patel',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Frontend Developer',
    company: 'Design Systems Inc'
  },
  {
    id: 103,
    user_id: 11,
    content: `// Clean code tip: Use meaningful variable names

// ❌ Bad - unclear and abbreviated
const d = new Date();
const u = users.filter(x => x.a > 18);
const calc = (a, b) => a * b * 0.1;

// ✅ Good - descriptive and clear
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
const calculateTaxAmount = (price, quantity) => price * quantity * TAX_RATE;

// Your future self will thank you! 🙏
// Code is read more often than it's written.`,
    post_type: 'code',
    code_language: 'javascript',
    created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 24,
    full_name: 'Jordan Williams',
    profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Senior Software Engineer',
    company: 'CodeCraft Technologies'
  },
  {
    id: 104,
    user_id: 12,
    content: "Breaking into cybersecurity was the best career decision I ever made! 🔐💪\n\nFrom zero knowledge to landing my dream job in 18 months:\n\n📚 Self-studied for 6 months (CompTIA Security+)\n🏆 Got certified in ethical hacking\n💼 Started with internship at local firm\n🚀 Now working on enterprise security solutions\n\nKey advice for aspiring cybersecurity professionals:\n• Start with fundamentals (networking, OS basics)\n• Practice on platforms like TryHackMe and HackTheBox\n• Join cybersecurity communities and forums\n• Never stop learning - threats evolve daily!\n\n#Cybersecurity #CareerChange #InfoSec #EthicalHacking",
    post_type: 'text',
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    likes_count: 156,
    comments_count: 41,
    full_name: 'Priya Singh',
    profile_picture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Cybersecurity Analyst',
    company: 'SecureGuard Systems'
  },
  {
    id: 105,
    user_id: 13,
    content: "Just finished building an AI-powered chatbot for customer service! 🤖✨\n\nUsing Python, TensorFlow, and natural language processing, this bot can:\n\n🎯 Handle 80% of common customer queries\n🧠 Learn from interactions to improve responses\n🌍 Support multiple languages\n📊 Provide analytics on customer sentiment\n⚡ Reduce response time from hours to seconds\n\nThe future of customer service is here, and it's incredibly exciting!\n\nWould love to connect with other AI enthusiasts working on similar projects!\n\n#AI #MachineLearning #NLP #CustomerService #Python #TensorFlow",
    post_type: 'text',
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    likes_count: 201,
    comments_count: 56,
    full_name: 'Carlos Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'AI/ML Engineer',
    company: 'IntelliBot Solutions'
  },
  {
    id: 2,
    user_id: 2,
    content: "Just finished implementing a neural network for medical image analysis! 🧠🏥\n\nThe model achieved 94% accuracy in detecting early-stage tumors. It's amazing how AI can assist healthcare professionals in making faster, more accurate diagnoses.\n\nNext step: Working on reducing false positives and improving edge case handling. The potential to save lives through technology is what drives me every day! 💪\n\n#AI #Healthcare #MachineLearning #MedTech",
    post_type: 'text',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 15,
    full_name: 'Sarah Chen',
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'AI Engineer',
    company: 'TechHealth Solutions'
  },
  {
    id: 3,
    user_id: 3,
    content: `// Clean architecture pattern for React applications
const useCleanArchitecture = () => {
  // Domain Layer - Business Logic
  const businessLogic = {
    validateUser: (user) => user.email && user.password,
    calculateTotal: (items) => items.reduce((sum, item) => sum + item.price, 0)
  };

  // Infrastructure Layer - External Services
  const services = {
    api: {
      fetchUsers: () => fetch('/api/users'),
      saveUser: (user) => fetch('/api/users', { method: 'POST', body: JSON.stringify(user) })
    },
    storage: {
      save: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
      load: (key) => JSON.parse(localStorage.getItem(key) || 'null')
    }
  };

  // Presentation Layer - UI Components
  const components = {
    UserForm: ({ onSubmit }) => (
      <form onSubmit={onSubmit}>
        {/* Form fields */}
      </form>
    )
  };

  return { businessLogic, services, components };
};

// This pattern keeps your code organized and testable! 🏗️`,
    post_type: 'code',
    code_language: 'javascript',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes_count: 124,
    comments_count: 28,
    full_name: 'Marcus Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Senior Full Stack Developer',
    company: 'WebScale Inc'
  },
  {
    id: 4,
    user_id: 4,
    content: "Day 100 of my coding journey! 🎉\n\nStarted as a complete beginner and now I've:\n✅ Built 5 full-stack applications\n✅ Contributed to 3 open-source projects\n✅ Landed my first developer job\n✅ Mentored 2 junior developers\n\nTo anyone starting their coding journey: consistency beats perfection every time. Keep coding, keep learning, and don't give up! 💪\n\nWhat's your biggest coding milestone? Share below! 👇\n\n#100DaysOfCode #CodingJourney #NeverGiveUp #TechCommunity",
    post_type: 'text',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes_count: 156,
    comments_count: 42,
    full_name: 'Emily Watson',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Junior Software Engineer',
    company: 'StartupTech'
  }
];