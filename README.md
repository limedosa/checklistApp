# Custom Checklist Builder

A modern web application for creating, organizing, and sharing customizable checklists with file attachments for any project or workflow.

## Purpose

The Custom Checklist Builder is designed to help teams and individuals organize their workflows by creating structured checklists with categories and items. Users can:

- Create custom checklists with multiple categories and items
- Upload and attach files to checklist items
- Share checklists with team members
- Clone existing checklists as templates
- Track progress across multiple projects

This tool is ideal for onboarding processes, client approvals, project management, and any scenario where structured documentation and file collection is needed.

## Features

- **Customizable Checklists**: Create and organize checklists with categories and items
- **File Attachments**: Upload and attach multiple files to any checklist item
- **Collaborative Sharing**: Share checklists with team members for file collection
- **User Authentication**: Secure login and user management
- **Dashboard**: View and manage all your checklists in one place
- **Cloning**: Create copies of existing checklists to use as templates
- **Dark Mode**: Toggle between light and dark themes
- **Search**: Find checklists quickly with global and dashboard search
- **Breadcrumb Navigation**: Easy navigation throughout the application
- **User Profile**: Manage your account settings and preferences
## Must haves: 
-Add a .env.local file with these values: 
     - NEXT_PUBLIC_API_URL=http://localhost:8001
     - NEXTAUTH_SECRET=your_nextauth_secret
     - GOOGLE_CLIENT_ID=your_google_client_id
     - GOOGLE_CLIENT_SECRET=your_google_client_secret
      -NEXTAUTH_URL=http://localhost:3000
      
-App will not run otherwise. 

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Backend 
- Node.js with Express or Next.js API routes
- json file for database(placeholder). 
- For future implementation,PostgreSQL for database and AWS S3 for file storage
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Frontend Setup 

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/limedosa/checklistApp.git
   cd checklistApp
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Backend Setup

1. Go to backend and run python file with json database code:
   \`\`\`bash
   cd backend && python app.py
   \`\`\`

## Usage

### Creating a Checklist

1. Log in to your account
2. Click "Create New" on the dashboard
3. Add a title for your checklist
4. Add categories by clicking "Add Category"
5. Add items to each category by clicking "Add Item"
6. Upload files to items as needed
7. Click "Save" to store your checklist

### Sharing a Checklist

1. Navigate to the dashboard
2. Find the checklist you want to share
3. Click the "Share" button
4. Copy the generated link and send it to your collaborators(doesn't work yet)

### Cloning a Checklist

1. Open an existing checklist
2. Click the "Clone" button
3. A new copy will be created and opened automatically
4. Modify as needed and save

## Project Structure

\`\`\`
custom-checklist-builder/
├── app/                    # Next.js app directory
│   ├── checklist/          # Checklist pages
│   ├── login/              # Authentication pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── api/                    # API routes
│   ├── auth/               # Authentication routes
│   │   ├── login/route.ts
│   │   ├── register/route.ts
│   │   └── logout/route.ts
│   ├── checklists/         # Checklist routes
│   │   ├── route.ts
│   │   └── [id]/           # Checklist-specific routes
│   │       ├── route.ts
│   │       ├── share/route.ts
│   │       └── clone/route.ts
│   ├── categories/         # Category routes
│   │   ├── route.ts
│   │   └── [id]/route.ts
│   ├── items/              # Item routes
│   │   ├── route.ts
│   │   └── [id]/           # Item-specific routes
│   │       ├── route.ts
│   │       └── files/route.ts
│   └── uploads/route.ts    # File upload route
├── components/             # React components
│   ├── ui/                 # UI components (shadcn)
│   ├── checklist-builder.tsx  # Main checklist component
│   ├── category-section.tsx   # Category component
│   └── ...                 # Other components
├── lib/                    # Utility functions
├── public/                 # Static assets
├── styles/                 # Additional styles
├── types/                  # TypeScript type definitions
├── .env                    # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies
├── README.md               # This file
└── tsconfig.json           # TypeScript configuration
\`\`\`

## Development Roadmap

- [ ] Backend API implementation
- [ ] Real database integration
- [ ] File storage service integration
- [ ] User permissions and roles
- [ ] Collaborative editing
- [ ] Export functionality (PDF, Excel)
- [ ] Mobile app version
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Advanced search filters

