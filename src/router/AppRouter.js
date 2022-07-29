import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../components/auth/routes/AuthRoutes';
import { JournalRoutes } from '../components/journal/routes/JournalRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { CheckingAuth } from '../ui/CheckingAuth';




export const AppRouter = () => {

  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          (status === 'authenticated')
           ? <Route path="/*" element={ <JournalRoutes /> } />
           : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }

        <Route path='/*' element={ <Navigate to='/auth/login' />  } />

        {/* Login y Registro */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

    </Routes>
  )
}