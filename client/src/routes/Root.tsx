import { lazy, Suspense } from 'react';

import { useAuth } from '../auth/AuthContext';
import Loading from '@/components/ui/LoadingComp';
import Layout from './layout';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function Root() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <Layout />
    </Suspense>
  );
}

export default Root;