import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { PropertyProvider } from './context/PropertyContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PropertyProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </PropertyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}