import React from 'react';
import { CooperativeRegisterModal } from './CooperativeRegisterModal';

interface WorkerJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * WorkerJoinModal has been updated to CooperativeRegisterModal to reflect the
 * cooperative-based institutional onboarding model (societies & collectives, not single workers).
 */
export const WorkerJoinModal: React.FC<WorkerJoinModalProps> = ({
  isOpen,
  onClose
}) => {
  return <CooperativeRegisterModal isOpen={isOpen} onClose={onClose} />;
};
