# Custom Checklist Builder

A modern web application for creating, organizing, and sharing customizable checklists with file attachments for any project or workflow.

![Custom Checklist Builder Screenshot](https://placeholder.svg?height=400&width=800)

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

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

### Backend (Recommended Implementation)
- Node.js with Express or Next.js API routes
- MongoDB or PostgreSQL for database
- AWS S3 or Vercel Blob for file storage
- JWT for authentication
- Prisma or Mongoose for ORM

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git

### Frontend Setup (Current Demo)

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

### Backend Setup (Future Implementation)

1. Set up your database (MongoDB example):
   \`\`\`bash
   # Install MongoDB locally or use MongoDB Atlas
   # Create a .env file with your database connection string:
   echo "DATABASE_URL=mongodb://localhost:27017/checklist-builder" > .env
   \`\`\`

2. Set up authentication:
   \`\`\`bash
   # Add JWT secret to .env
   echo "JWT_SECRET=your-secret-key" >> .env
   \`\`\`

3. Set up file storage:
   \`\`\`bash
   # For AWS S3
   echo "AWS_ACCESS_KEY_ID=your-access-key" >> .env
   echo "AWS_SECRET_ACCESS_KEY=your-secret-key" >> .env
   echo "AWS_REGION=your-region" >> .env
   echo "AWS_BUCKET_NAME=your-bucket-name" >> .env
   
   # Or for Vercel Blob
   echo "BLOB_READ_WRITE_TOKEN=your-token" >> .env
   \`\`\`

4. Initialize the database:
   \`\`\`bash
   npx prisma db push
   # or
   npx mongoose-schema-generator
   \`\`\`

5. Start the backend server:
   \`\`\`bash
   npm run start:server
   # or
   yarn start:server
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
4. Copy the generated link and send it to your collaborators

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

Created with ❤️ by [Your Name]
