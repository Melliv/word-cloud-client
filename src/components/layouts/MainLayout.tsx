import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <div className="text-5xl py-6">Word Cloud</div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
