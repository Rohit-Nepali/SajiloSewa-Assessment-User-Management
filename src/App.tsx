import { Navigate, Route, Routes } from 'react-router-dom';

import { Shell } from './components/layout/Shell';

import { UserListPage } from './pages/UserListPage';
import { UserFormPage } from './pages/UserFormPage';
import { UserDetailsPage } from './pages/UserDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/new" element={<UserFormPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage edit />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;