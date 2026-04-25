# Delmonte Live System

🎉 A live content platform with M-Pesa payments integration.

## Features

- ✅ User Authentication (Signup/Login)
- ✅ Daily Dynamic Content
- ✅ Package Selection
- ✅ M-Pesa Payment Integration (Demo)
- ✅ Admin Dashboard
- ✅ Revenue Tracking
- ✅ LocalStorage Persistence

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### Test Credentials

- **Admin:** username: `admin`, password: `admin`
- **New User:** Create a new account

## Deployment

### Deploy on Vercel (Recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this repository
4. Click **Deploy**

✅ **Done!** Your site is live

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Next Steps

- [ ] Connect real M-Pesa Daraja API
- [ ] Add backend database (MongoDB/PostgreSQL)
- [ ] Implement user authentication (JWT)
- [ ] Add image upload functionality
- [ ] Custom domain setup

## Tech Stack

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vercel** - Hosting

## License

MIT