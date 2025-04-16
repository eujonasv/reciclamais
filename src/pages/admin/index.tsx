
import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import AdminMap from '@/components/AdminMap';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AdminPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
    });
  }, [navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <AdminMap />
      </div>
    </MainLayout>
  );
};

export default AdminPage;
