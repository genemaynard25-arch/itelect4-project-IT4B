## Live Deployment

- **Live app:** https://itelect4-project-it4b.vercel.app
- **Backend API:** https://itelect4-backend-two.vercel.app

### Environment variables

- `VITE_API_URL` - base URL of the backend, no trailing slash
  (local: `http://localhost:4000`, deployed: `https://itelect4-backend-two.vercel.app`)

Vite reads this at build time, so redeploy after changing it.