# Travel App - README

## 📱 Project Description

**Travel App** is a comprehensive web application for planning and managing travel itineraries. The application allows users to create travel routes, view statistics, manage their profiles, and interact with other users.

## 🎯 Key Features

### For Users:
- 🔐 Registration and authentication
- ✈️ Create and manage travel itineraries
- 📊 View travel details (duration, budget, points of interest)
- 💳 Payment integration (Stripe)
- 📸 Upload travel images
- 🎨 Personal profile management

### For Administrators:
- 📈 Dashboard with analytics
- 👥 User management
- 🗺️ Travel management
- 📊 Charts for user growth and trip trends by travel style
- 📋 View detailed statistics

## 🛠️ Tech Stack

### Frontend:
- **React 19** - UI library
- **React Router v7** - routing
- **TypeScript** - type safety
- **Tailwind CSS** - styling
- **Vite** - build tool

### Backend:
- **Appwrite** - BaaS platform (authentication, database, file storage)
- **Node.js** - runtime

### Libraries & Components:
- **Syncfusion Charts** - graphs and diagrams
- **Syncfusion Grid/Pager** - tables and pagination
- **Stripe** - payments
- **Sentry** - error monitoring

## 📁 Project Structure

```
travel-app/
├── app/
│   ├── routes/
│   │   ├── admin/
│   │   │   ├── dashboard.tsx       # Admin dashboard with analytics
│   │   │   ├── trips.tsx           # Trip management
│   │   │   ├── all-users.tsx       # User list
│   │   │   └── create-trip.tsx     # Create new trip
│   │   ├── user/
│   │   │   ├── profile.tsx         # User profile
│   │   │   └── my-trips.tsx        # My trips
│   │   └── home.tsx                # Homepage
│   ├── appwrite/
│   │   ├── auth.ts                 # Authentication functions
│   │   ├── trips.ts                # Trip operations
│   │   ├── dashboard.ts            # Analytics
│   │   └── client.ts               # Appwrite config
│   ├── components/
│   │   ├── Header.tsx              # Header component
│   │   ├── TripCard.tsx            # Trip card component
│   │   ├── StatsCard.tsx           # Stats card component
│   │   └── ...
│   ├── lib/
│   │   └── utils.ts                # Utilities (parsing, formatting)
│   ├── constants/
│   │   └── index.ts                # Constants and chart configs
│   ├── hooks/
│   │   └── useSyncfusionComponent.ts # Hook for lazy loading Syncfusion
│   └── index.d.ts                  # TypeScript types
├── public/
├── .env.example
└── package.json
```

## ⚙️ Installation & Setup

### Requirements:
- Node.js 18+
- npm or yarn
- Appwrite account
- Stripe account (optional)

### Installation Steps:

1. **Clone the repository:**
```bash
git clone <repo-url>
cd travel-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Fill in environment variables:**
```env
VITE_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_API_KEY=your-api-key
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_USERS_COLLECTION_ID=your-users-collection
VITE_APPWRITE_TRIPS_COLLECTION_ID=your-trips-collection
VITE_STRIPE_PUBLIC_KEY=your-stripe-key
VITE_SENTRY_DSN=your-sentry-dsn
```

5. **Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### Users Collection:
```typescript
{
  $id: string,
  name: string,
  email: string,
  imageUrl: string,
  status: "admin" | "user",
  joinedAt: string,
  itineraryCount: number
}
```

### Trips Collection:
```typescript
{
  $id: string,
  userId: string,
  tripDetail: string (JSON), // Contains: name, description, interests, travelStyle, duration, budget, estimatedPrice, itinerary, payment_link
  imageUrls: string[],
  createdAt: string
}
```

## 🔑 Core Features

### Dashboard Analytics:
- **Total Users** - total users + monthly statistics
- **Total Trips** - total trips + monthly statistics
- **Active Users** - active administrators
- **User Growth Chart** - user growth over days
- **Trip Trends Chart** - trip distribution by travel style

### Trip Management:
- Create new trips with AI generation
- Edit and delete trips
- Pagination (6 items per page)
- Filter by various parameters

### User Management:
- View user list
- Filter and search
- Delete users

## 🐛 Fixed Issues

- ✅ Invalid JSON parsing in `tripDetail`
- ✅ Syncfusion PagerComponent pagination
- ✅ Syncfusion Charts loading
- ✅ Handling `undefined` values in chart configs
- ✅ Data filtering and grouping by travel style

## 📊 Appwrite API Endpoints

### Users:
- `GET /databases/{databaseId}/collections/{usersCollectionId}/documents` - list users
- `POST /account/sessions/email` - login
- `POST /account` - register

### Trips:
- `GET /databases/{databaseId}/collections/{tripsCollectionId}/documents` - list trips
- `POST /databases/{databaseId}/collections/{tripsCollectionId}/documents` - create trip
- `DELETE /databases/{databaseId}/collections/{tripsCollectionId}/documents/{tripId}` - delete trip

## 🚀 Deployment

### On Vercel:
```bash
npm run build
vercel deploy
```

### Docker Deployment:
```bash
docker build -t travel-app .
docker run -p 3000:3000 travel-app
```

The containerized application can be deployed to:
- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run type-check # Run TypeScript type checking
```

## 🔒 Security

- Environment variables are used for sensitive data
- Appwrite handles authentication securely
- CORS is configured for production
- Stripe integration follows PCI compliance

## 📝 License

MIT License - Feel free to use this project

## 👨‍💻 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions and suggestions, please open an Issue on GitHub or contact the developer.

---

**Version:** 1.0.0  
**Last Updated:** November 17, 2025  
**Author:** Vladyslav
**Repository:** https://github.com/Facelles