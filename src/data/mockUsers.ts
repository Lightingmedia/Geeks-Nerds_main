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
  document_url?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  full_name: string;
  profile_picture: string;
  job_title: string;
  company: string;
  image_description?: string;
  image_type?: string;
}

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'alex.chen@meta.com',
    full_name: 'Alex Chen',
    profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Senior Frontend Developer passionate about React and TypeScript. Coffee addict, mechanical keyboard enthusiast, and weekend game dev.',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'GraphQL', 'Node.js', 'Docker'],
    company: 'Meta',
    job_title: 'Senior Frontend Developer',
    age_range: '28-32',
    personality_traits: ['analytical', 'collaborative', 'detail-oriented', 'curious'],
    interests: ['web development', 'mechanical keyboards', 'indie games', 'coffee brewing', 'open source'],
    communication_style: 'technical but approachable, uses emojis, shares code snippets',
    expertise_level: 'senior',
    preferred_content: ['code reviews', 'tech tutorials', 'tool recommendations', 'industry discussions']
  },
  {
    id: 2,
    email: 'sarah.johnson@google.com',
    full_name: 'Sarah Johnson',
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Full Stack Engineer building scalable web applications. Python enthusiast, data visualization nerd, and sci-fi book collector.',
    location: 'Mountain View, CA',
    skills: ['Python', 'Django', 'React', 'PostgreSQL', 'AWS'],
    company: 'Google',
    job_title: 'Full Stack Engineer',
    age_range: '26-30',
    personality_traits: ['methodical', 'helpful', 'innovative', 'patient'],
    interests: ['data science', 'sci-fi literature', 'backend architecture', 'cloud computing', 'mentoring'],
    communication_style: 'educational, detailed explanations, encourages discussion',
    expertise_level: 'senior',
    preferred_content: ['technical deep-dives', 'learning resources', 'career advice', 'book recommendations']
  },
  {
    id: 3,
    email: 'marcus.rodriguez@microsoft.com',
    full_name: 'Marcus Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'DevOps Engineer automating all the things. Kubernetes wizard, CI/CD pipeline architect, and retro gaming collector.',
    location: 'Seattle, WA',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'Azure', 'Python', 'Bash'],
    company: 'Microsoft',
    job_title: 'DevOps Engineer',
    age_range: '30-34',
    personality_traits: ['systematic', 'problem-solver', 'efficient', 'nostalgic'],
    interests: ['infrastructure automation', 'retro gaming', 'system optimization', 'cloud architecture'],
    communication_style: 'practical, solution-focused, uses technical diagrams',
    expertise_level: 'expert',
    preferred_content: ['automation tutorials', 'infrastructure guides', 'gaming nostalgia', 'efficiency tips']
  },
  {
    id: 4,
    email: 'emily.watson@startup.io',
    full_name: 'Emily Watson',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Junior Developer learning everything I can! Recent CS grad, anime enthusiast, and aspiring game developer.',
    location: 'Austin, TX',
    skills: ['JavaScript', 'Python', 'Git', 'HTML/CSS', 'Unity'],
    company: 'TechStart Inc',
    job_title: 'Junior Software Developer',
    age_range: '22-25',
    personality_traits: ['enthusiastic', 'curious', 'determined', 'creative'],
    interests: ['web development', 'game development', 'anime', 'learning new technologies', 'coding challenges'],
    communication_style: 'excited, asks lots of questions, shares learning journey',
    expertise_level: 'junior',
    preferred_content: ['learning experiences', 'beginner tutorials', 'coding challenges', 'career questions']
  },
  {
    id: 5,
    email: 'david.kim@nvidia.com',
    full_name: 'David Kim',
    profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'AI/ML Engineer working on computer vision. PhD in Machine Learning, photography hobbyist, and tech conference speaker.',
    location: 'Santa Clara, CA',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'CUDA', 'OpenCV', 'Docker'],
    company: 'NVIDIA',
    job_title: 'AI/ML Engineer',
    age_range: '32-36',
    personality_traits: ['intellectual', 'precise', 'innovative', 'articulate'],
    interests: ['machine learning', 'computer vision', 'photography', 'research papers', 'conference speaking'],
    communication_style: 'academic but accessible, shares research insights, uses data visualizations',
    expertise_level: 'expert',
    preferred_content: ['research discussions', 'technical papers', 'AI trends', 'photography projects']
  },
  {
    id: 6,
    email: 'jessica.martinez@amazon.com',
    full_name: 'Jessica Martinez',
    profile_picture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Security Engineer protecting digital assets. Cybersecurity expert, CTF competitor, and privacy advocate.',
    location: 'Arlington, VA',
    skills: ['Cybersecurity', 'Penetration Testing', 'Python', 'Linux', 'Network Security'],
    company: 'Amazon',
    job_title: 'Security Engineer',
    age_range: '29-33',
    personality_traits: ['vigilant', 'analytical', 'ethical', 'competitive'],
    interests: ['cybersecurity', 'CTF competitions', 'privacy rights', 'ethical hacking', 'security research'],
    communication_style: 'security-focused, shares threat insights, promotes best practices',
    expertise_level: 'senior',
    preferred_content: ['security alerts', 'CTF writeups', 'privacy tips', 'threat analysis']
  },
  {
    id: 7,
    email: 'ryan.thompson@apple.com',
    full_name: 'Ryan Thompson',
    profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'iOS Developer crafting beautiful mobile experiences. Swift enthusiast, UI/UX perfectionist, and indie app creator.',
    location: 'Cupertino, CA',
    skills: ['Swift', 'SwiftUI', 'iOS', 'Xcode', 'Core Data', 'UIKit'],
    company: 'Apple',
    job_title: 'iOS Developer',
    age_range: '27-31',
    personality_traits: ['perfectionist', 'creative', 'user-focused', 'detail-oriented'],
    interests: ['iOS development', 'mobile UI/UX', 'indie app development', 'design patterns', 'Apple ecosystem'],
    communication_style: 'design-conscious, shares UI mockups, focuses on user experience',
    expertise_level: 'senior',
    preferred_content: ['UI showcases', 'development tips', 'app reviews', 'design discussions']
  },
  {
    id: 8,
    email: 'lisa.chang@intel.com',
    full_name: 'Lisa Chang',
    profile_picture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Hardware Engineer designing the future of computing. Chip architecture specialist, maker space regular, and robotics hobbyist.',
    location: 'Portland, OR',
    skills: ['VHDL', 'Verilog', 'FPGA', 'Circuit Design', 'Python', 'MATLAB'],
    company: 'Intel',
    job_title: 'Hardware Engineer',
    age_range: '31-35',
    personality_traits: ['logical', 'hands-on', 'innovative', 'methodical'],
    interests: ['hardware design', 'robotics', 'maker projects', 'embedded systems', 'IoT'],
    communication_style: 'technical, shares project photos, explains complex concepts simply',
    expertise_level: 'expert',
    preferred_content: ['hardware projects', 'maker tutorials', 'engineering insights', 'robotics demos']
  }
];

export const mockPosts: Post[] = [
  // Alex Chen's Posts
  {
    id: 1,
    user_id: 1,
    content: "Just spent the weekend building a custom mechanical keyboard with Gateron Brown switches and SA keycaps. The typing experience is *chef's kiss* 🤌\n\nAnyone else obsessed with the perfect typing setup? Drop your keyboard specs below! ⌨️",
    post_type: 'text',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes_count: 24,
    comments_count: 8,
    full_name: 'Alex Chen',
    profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Senior Frontend Developer',
    company: 'Meta',
    image_description: 'A beautifully crafted custom mechanical keyboard with wooden case, white SA profile keycaps, and RGB underglow on a clean desk setup with a coffee mug',
    image_type: 'photo'
  },
  {
    id: 2,
    user_id: 1,
    content: `// Clean way to handle async operations in React
const useAsyncData = <T>(asyncFn: () => Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await asyncFn();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error };
};`,
    post_type: 'code',
    code_language: 'typescript',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes_count: 42,
    comments_count: 12,
    full_name: 'Alex Chen',
    profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Senior Frontend Developer',
    company: 'Meta',
    image_description: 'VS Code screenshot showing the custom hook code with syntax highlighting and a clean dark theme',
    image_type: 'screenshot'
  },
  {
    id: 3,
    user_id: 1,
    content: "Hot take: The best debugging tool is still console.log() 🤷‍♂️\n\nYes, I know about debuggers, breakpoints, and fancy dev tools. But sometimes you just need that quick and dirty log to see what's happening.\n\nWhat's your go-to debugging method?",
    post_type: 'text',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes_count: 67,
    comments_count: 23,
    full_name: 'Alex Chen',
    profile_picture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Senior Frontend Developer',
    company: 'Meta',
    image_description: 'Humorous meme showing a developer surrounded by console.log statements with the caption "When you debug with console.log"',
    image_type: 'meme'
  },

  // Sarah Johnson's Posts
  {
    id: 4,
    user_id: 2,
    content: "Just finished reading 'Klara and the Sun' by Kazuo Ishiguro and I'm blown away by how it explores AI consciousness and empathy. 🤖❤️\n\nAs someone who works with AI systems daily, the philosophical questions it raises about artificial beings and their place in our world really hit home.\n\nAny other sci-fi recommendations that blend technology with deep human themes?",
    post_type: 'text',
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes_count: 31,
    comments_count: 15,
    full_name: 'Sarah Johnson',
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Full Stack Engineer',
    company: 'Google',
    image_description: 'A cozy reading nook with the book "Klara and the Sun" on a wooden table next to a steaming mug of tea and some tech magazines',
    image_type: 'photo'
  },
  {
    id: 5,
    user_id: 2,
    content: `# Database Query Optimization Tips 🚀

Just optimized a slow query that was taking 3+ seconds down to 50ms! Here's what worked:

## Before:
- Full table scan on 2M+ records
- No proper indexing
- Unnecessary JOINs

## After:
- Added composite index on (user_id, created_at)
- Removed redundant JOINs
- Used LIMIT with proper pagination

## Key Takeaways:
1. **EXPLAIN is your friend** - Always check execution plans
2. **Index strategically** - Don't just add indexes everywhere
3. **Measure twice, optimize once** - Profile before optimizing

What's your biggest database optimization win? Share below! 👇`,
    post_type: 'text',
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 27,
    full_name: 'Sarah Johnson',
    profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Full Stack Engineer',
    company: 'Google',
    image_description: 'Database performance dashboard showing query execution time graphs with a dramatic improvement from 3000ms to 50ms',
    image_type: 'screenshot'
  },

  // Marcus Rodriguez's Posts
  {
    id: 6,
    user_id: 3,
    content: "Finally got my hands on a working Nintendo Virtual Boy! 🔴👀\n\nYes, it gives you a headache after 10 minutes. Yes, the graphics are primitive. But there's something magical about experiencing this piece of gaming history firsthand.\n\nCurrently playing Wario Land and it's actually pretty fun! Anyone else collect retro gaming 'failures'?",
    post_type: 'text',
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes_count: 45,
    comments_count: 18,
    full_name: 'Marcus Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'DevOps Engineer',
    company: 'Microsoft',
    image_description: 'A Nintendo Virtual Boy console set up on a retro gaming shelf alongside other vintage consoles, with red lighting creating an atmospheric glow',
    image_type: 'photo'
  },
  {
    id: 7,
    user_id: 3,
    content: `# Kubernetes Deployment Pipeline 🚢

apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myregistry/web-app:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10`,
    post_type: 'code',
    code_language: 'yaml',
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    likes_count: 56,
    comments_count: 14,
    full_name: 'Marcus Rodriguez',
    profile_picture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'DevOps Engineer',
    company: 'Microsoft',
    image_description: 'Kubernetes dashboard showing healthy pod deployments with green status indicators and resource utilization graphs',
    image_type: 'screenshot'
  },

  // Emily Watson's Posts
  {
    id: 8,
    user_id: 4,
    content: "Day 47 of my coding journey and I just solved my first medium-level LeetCode problem! 🎉\n\nIt was the 'Longest Substring Without Repeating Characters' problem and it took me 3 hours, but I finally got it using the sliding window technique.\n\nThe feeling when your solution passes all test cases is just... *chef's kiss* 😭\n\n#100DaysOfCode #LeetCode #NeverGiveUp",
    post_type: 'text',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes_count: 78,
    comments_count: 32,
    full_name: 'Emily Watson',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Junior Software Developer',
    company: 'TechStart Inc',
    image_description: 'LeetCode problem page showing "Accepted" status with green checkmarks and a celebration animation',
    image_type: 'screenshot'
  },
  {
    id: 9,
    user_id: 4,
    content: "Quick question for the senior devs: When you're learning a new framework, do you build a todo app or jump straight into a more complex project? 🤔\n\nI'm about to start learning Vue.js and I'm torn between:\n1. Building another todo app (boring but thorough)\n2. Recreating my favorite anime character database (fun but maybe too complex?)\n\nWhat would you recommend for someone coming from React?",
    post_type: 'text',
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    likes_count: 34,
    comments_count: 28,
    full_name: 'Emily Watson',
    profile_picture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Junior Software Developer',
    company: 'TechStart Inc',
    image_description: 'Split screen showing Vue.js documentation on one side and anime character artwork on the other, representing the decision between learning approaches',
    image_type: 'artwork'
  },

  // David Kim's Posts
  {
    id: 10,
    user_id: 5,
    content: "Fascinating paper just dropped on arXiv: 'Attention Is All You Need... But What About Efficiency?' 📄\n\nThe authors propose a novel attention mechanism that reduces computational complexity from O(n²) to O(n log n) while maintaining performance on most NLP tasks.\n\nKey insights:\n• Sparse attention patterns can be learned, not just designed\n• 40% reduction in training time on large models\n• Minimal impact on downstream task performance\n\nThis could be huge for making large language models more accessible. Thoughts?",
    post_type: 'text',
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes_count: 92,
    comments_count: 21,
    full_name: 'David Kim',
    profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'AI/ML Engineer',
    company: 'NVIDIA',
    image_description: 'Research paper visualization showing attention mechanism diagrams and performance comparison charts with efficiency improvements highlighted',
    image_type: 'screenshot'
  },
  {
    id: 11,
    user_id: 5,
    content: "Weekend project: Built a computer vision model to automatically categorize my photography portfolio! 📸🤖\n\nUsed a fine-tuned ResNet-50 to classify images into:\n• Landscape\n• Portrait\n• Street Photography\n• Architecture\n• Abstract\n\n94% accuracy on my test set of 2,000 images. The model even caught some shots I had miscategorized myself!\n\nNext step: Building a web app to help other photographers organize their work. Anyone interested in beta testing?",
    post_type: 'text',
    created_at: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    likes_count: 67,
    comments_count: 19,
    full_name: 'David Kim',
    profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'AI/ML Engineer',
    company: 'NVIDIA',
    image_description: 'Grid of photographs automatically sorted into categories with ML confidence scores, showing the AI classification system in action',
    image_type: 'screenshot'
  },

  // Jessica Martinez's Posts
  {
    id: 12,
    user_id: 6,
    content: "🚨 PSA: If you're still using SMS for 2FA, please consider switching to an authenticator app! 🚨\n\nSIM swapping attacks are becoming more sophisticated, and SMS 2FA is increasingly vulnerable. Here's what I recommend:\n\n✅ Authy or Google Authenticator for TOTP\n✅ Hardware keys (YubiKey) for high-value accounts\n✅ Backup codes stored securely offline\n\n❌ SMS 2FA (better than nothing, but not ideal)\n❌ Email-based 2FA for critical accounts\n\nYour digital security is only as strong as your weakest authentication method. Stay safe out there! 🔐",
    post_type: 'text',
    created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    likes_count: 156,
    comments_count: 43,
    full_name: 'Jessica Martinez',
    profile_picture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Security Engineer',
    company: 'Amazon',
    image_description: 'Infographic comparing different 2FA methods with security ratings and vulnerability assessments',
    image_type: 'artwork'
  },
  {
    id: 13,
    user_id: 6,
    content: "Just wrapped up an amazing CTF weekend! 🏆\n\nOur team 'NullPointerException' placed 3rd out of 847 teams in the CyberDefenders CTF. The web exploitation challenges were particularly tricky this time.\n\nFavorite challenge: A blind SQL injection that required timing attacks to extract data. Took us 6 hours but the satisfaction when we finally got the flag... priceless! 💪\n\nShoutout to my teammates @alex_crypto and @binary_ninja for the clutch reversing skills!\n\nAnyone else participate? How did your team do?",
    post_type: 'text',
    created_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    likes_count: 89,
    comments_count: 25,
    full_name: 'Jessica Martinez',
    profile_picture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Security Engineer',
    company: 'Amazon',
    image_description: 'CTF scoreboard showing team rankings with "NullPointerException" in 3rd place, surrounded by energy drinks and multiple monitors',
    image_type: 'photo'
  },

  // Ryan Thompson's Posts
  {
    id: 14,
    user_id: 7,
    content: "SwiftUI's new NavigationStack in iOS 16 is a game changer! 🚀\n\nFinally, we have programmatic navigation that doesn't feel like fighting the framework. The type-safe navigation paths are *chef's kiss*\n\nBeen refactoring my indie app's navigation and the code is so much cleaner now. No more NavigationLink hacks or weird state management for deep linking.\n\nWho else has made the switch? Any gotchas I should watch out for?",
    post_type: 'text',
    created_at: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    likes_count: 73,
    comments_count: 16,
    full_name: 'Ryan Thompson',
    profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'iOS Developer',
    company: 'Apple',
    image_description: 'Xcode interface showing SwiftUI NavigationStack code with clean, modern navigation implementation',
    image_type: 'screenshot'
  },
  {
    id: 15,
    user_id: 7,
    content: "UI design pet peeve: Apps that use system colors incorrectly 😤\n\nJust saw an app using .systemRed for their primary brand color. That's not what system colors are for! They're semantic colors that adapt to user preferences and accessibility settings.\n\n✅ Use .systemRed for destructive actions (delete, error states)\n✅ Use custom colors for branding\n✅ Support both light and dark mode variants\n\n❌ Don't use semantic colors for non-semantic purposes\n\nSmall details like this separate good apps from great apps. Attention to Apple's HIG matters! 📱",
    post_type: 'text',
    created_at: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    likes_count: 94,
    comments_count: 31,
    full_name: 'Ryan Thompson',
    profile_picture: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'iOS Developer',
    company: 'Apple',
    image_description: 'Side-by-side comparison of correct vs incorrect use of system colors in iOS app interfaces',
    image_type: 'artwork'
  },

  // Lisa Chang's Posts
  {
    id: 16,
    user_id: 8,
    content: "Weekend maker project complete! 🔧⚡\n\nBuilt an automated plant watering system using:\n• ESP32 microcontroller\n• Soil moisture sensors\n• 12V water pumps\n• Custom PCB design\n• Mobile app for monitoring\n\nThe best part? It sends me push notifications with plant health updates and cute plant emojis 🌱📱\n\nMy succulents have never been happier! Next up: Adding computer vision to detect plant diseases.\n\nAnyone else building IoT projects for their hobbies?",
    post_type: 'text',
    created_at: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    likes_count: 112,
    comments_count: 28,
    full_name: 'Lisa Chang',
    profile_picture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Hardware Engineer',
    company: 'Intel',
    image_description: 'Automated plant watering system with ESP32, sensors, and pumps next to healthy plants, with a smartphone showing the monitoring app',
    image_type: 'photo'
  },
  {
    id: 17,
    user_id: 8,
    content: "Mind = blown 🤯\n\nJust learned that the new M2 chip uses a 5nm process node with over 20 billion transistors. To put that in perspective:\n\n• Each transistor is about 50 atoms wide\n• If transistors were 1mm, the chip would be 200km across\n• The entire chip could fit through the eye of a needle 50 times\n\nWe're literally manipulating matter at near-atomic scales to create these incredible machines. Sometimes I step back and marvel at what we've achieved in semiconductor engineering.\n\nWhat's your favorite mind-bending tech fact? 🧠⚡",
    post_type: 'text',
    created_at: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    likes_count: 187,
    comments_count: 45,
    full_name: 'Lisa Chang',
    profile_picture: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    job_title: 'Hardware Engineer',
    company: 'Intel',
    image_description: 'Microscopic view of semiconductor transistors with scale comparisons and infographic showing the incredible miniaturization of modern chips',
    image_type: 'artwork'
  }
];