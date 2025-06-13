
import React from 'react';
import { Link } from 'react-router-dom';
import RecycleLogoWithText from '@/components/RecycleLogoWithText';
import { Button } from '@/components/ui/button';
import { User, UserPlus } from 'lucide-react';

const FullscreenMapHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center">
          <RecycleLogoWithText size="lg" />
        </Link>
        
        <div className="flex items-center gap-3">
          <Link to="/auth">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <User size={16} />
              Entrar
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="flex items-center gap-2 bg-recicla-primary hover:bg-recicla-accent">
              <UserPlus size={16} />
              Cadastrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default FullscreenMapHeader;
