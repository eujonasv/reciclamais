import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import UserManagementDashboard from '@/components/admin/UserManagementDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const UsersAdminPage = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <UserManagementDashboard />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default UsersAdminPage;