import React from 'react';
import { WorkerDiscoveryModal } from './WorkerDiscoveryModal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    serviceId?: string;
    location?: string;
    date?: string;
    timeSlot?: string;
    workerId?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefill
}) => {
  return (
    <WorkerDiscoveryModal
      isOpen={isOpen}
      onClose={onClose}
      initialLocality={prefill?.location || 'Kothrud, Pune'}
      initialTrade={prefill?.serviceId || 'all'}
      initialWorkerId={prefill?.workerId}
    />
  );
};
