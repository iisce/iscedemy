import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';

export default function Modal({ 
  isOpen,
  onClose, 
  children, 
} : {
  isOpen: boolean;
   onClose: () => void; 
   children: React.ReactNode; 
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogTrigger asChild>
      <Button onClick={onClose} className="hidden">Open</Button>
    </DialogTrigger>
    <DialogContent>
      
      {children}
    </DialogContent>
  </Dialog>
  );
}
