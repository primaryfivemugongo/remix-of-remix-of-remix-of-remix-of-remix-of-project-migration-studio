import { memo, type RefObject } from 'react';
import { Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import adminPhoto from '@/assets/admin-photo.jpg.asset.json';
import { Button } from '@/components/ui/button';
import { AdminProfile } from './admin-profile';

interface AppBarProps {
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuExpanded: boolean;
  profileOpen: boolean;
  onToggleMenu: () => void;
  onToggleProfile: () => void;
  onCloseProfile: () => void;
}

export const AppBar = memo(function AppBar({ triggerRef, menuExpanded, profileOpen, onToggleMenu, onToggleProfile, onCloseProfile }: AppBarProps) {
  return <header className="library-appbar">
    <Button ref={triggerRef} variant="source" size="source" className="library-icon-control" aria-label="Toggle class menu" aria-controls="library-navigation" aria-expanded={menuExpanded} onClick={onToggleMenu} title="Class menu"><Menu /></Button>
    <Button asChild variant="source" size="source" className="library-brand"><Link to="/"><span>Fresh Teacher's Platform</span><span className="library-brand-caption">Since COVID-19</span></Link></Button>
    <div className="library-appbar-actions">
      <Button variant="source" size="source" className="library-avatar" aria-label="Admin's contact" aria-expanded={profileOpen} onClick={onToggleProfile}>
        <img src={adminPhoto.url} alt="Mutumba Jesse Paul" />
      </Button>
      <AdminProfile open={profileOpen} onClose={onCloseProfile} />
    </div>
  </header>;
});