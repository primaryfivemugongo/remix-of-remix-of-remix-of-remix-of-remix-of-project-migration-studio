import { memo, useEffect } from 'react';
import { X } from 'lucide-react';
import adminPhoto from '@/assets/admin-photo.jpg.asset.json';
import { Button } from '@/components/ui/button';

export const AdminProfile = memo(function AdminProfile({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.library-appbar-actions')) onClose();
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open, onClose]);

  if (!open) return null;
  return <div className="library-profile" role="dialog" aria-label="Admin's contact">
    <Button variant="source" size="source" className="library-profile-close" aria-label="Close contact card" onClick={onClose}><X /></Button>
    <img src={adminPhoto.url} alt="" />
    <h2>Admin's Contact:</h2>
    <p className="library-profile-name">Mutumba Jesse Paul</p>
    <p><a href="tel:+256750687790">+256750687790</a> / <a href="tel:+256786812837">+256786812837</a></p>
    <p><a href="mailto:freshteacheruganda256@gmail.com">freshteacheruganda256@gmail.com</a></p>
  </div>;
});