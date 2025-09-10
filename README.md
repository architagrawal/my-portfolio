# Akshat's Modern Portfolio

A cutting-edge, production-ready portfolio website that redefines personal branding for developers and tech professionals. Built with modern web technologies and designed with meticulous attention to detail.

🌐 **Live Link**: [https://iakshatjha.vercel.app](https://iakshatjha.vercel.app)

## 🌟 Features

### Interactive Design
- **Animated Storytelling**: Carefully crafted animations powered by Framer Motion
- **Dynamic Theme Switching**: Seamless light and dark mode transitions
- **Responsive Design**: Beautiful adaptation from mobile to desktop
- **Apple-level Aesthetics**: Meticulous attention to detail and user experience

### Technical Excellence
- **Next.js 13 with TypeScript**: Type-safe, server-side rendered performance
- **Modern CSS Architecture**: Tailwind CSS with custom design tokens
- **Component Library**: shadcn/ui for accessibility and consistency
- **Performance Optimized**: Core Web Vitals optimized with static export

### Professional Showcase
- **Impact-Driven Content**: Showcases measurable achievements and real-world impact
- **Interactive Project Cards**: Live demo links and detailed project breakdowns
- **Achievement System**: Professional certifications and competition wins
- **Contact Integration**: Professional contact information and resume access

### User Experience
- **Smooth Navigation**: Scroll-based navigation with active section highlighting
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Lightning-fast loading with optimized assets

## 🛠️ Built With

- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-web
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

The project is configured for static export, making it perfect for deployment on any static hosting platform.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/
│   ├── layout/            # Layout components (Header, Footer)
│   ├── sections/          # Page sections (Hero, About, Projects, etc.)
│   ├── ui/                # Reusable UI components
│   └── theme-provider.tsx # Theme context provider
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (blue-600 to teal-600)
- **Secondary**: Neutral grays with proper contrast ratios
- **Accent Colors**: Category-specific colors (blue, teal, purple, orange)

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Consistent sizing with proper line heights
- **Weights**: Regular, medium, semibold, bold

### Spacing
- **System**: 8px base unit for consistent spacing
- **Layout**: Responsive grid system with proper breakpoints

## 🔧 Customization

### Personal Information
Update the following files with your information:
- `components/sections/Hero.tsx` - Name, title, and social links
- `components/sections/About.tsx` - Personal description and background
- `components/sections/Experience.tsx` - Work experience and achievements
- `components/sections/Projects.tsx` - Project showcase
- `components/sections/Skills.tsx` - Technical skills
- `components/sections/Achievements.tsx` - Awards and certifications
- `components/sections/Contact.tsx` - Contact information

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for design tokens
- Customize component styles in individual component files

### Content
- Replace placeholder images with your own
- Update social media links
- Modify project descriptions and achievements
- Add your resume link

## 📱 Responsive Design

The portfolio is built with a mobile-first approach:
- **Mobile**: Optimized for touch interactions and small screens
- **Tablet**: Balanced layout with improved spacing
- **Desktop**: Full-featured experience with advanced animations

## ⚡ Performance

- **Static Export**: Pre-rendered for optimal loading speeds
- **Image Optimization**: Responsive images with proper loading
- **Code Splitting**: Automatic code splitting with Next.js
- **Core Web Vitals**: Optimized for Google's performance metrics

## 🌐 Deployment

The project is deployed on Vercel at: [https://iakshatjha.vercel.app](https://iakshatjha.vercel.app)

For your own deployment:

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with automatic builds on every push

The static export configuration makes it compatible with any static hosting platform.

## 🤝 Contributing

This portfolio template can be adapted and customized for various use cases:
- Software engineers building their personal brand
- Freelancers showcasing their work
- Students displaying academic projects
- Professionals transitioning into tech

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** team for the amazing React framework
- **Vercel** for seamless deployment platform

---

**Built with ❤️ and modern web technologies**