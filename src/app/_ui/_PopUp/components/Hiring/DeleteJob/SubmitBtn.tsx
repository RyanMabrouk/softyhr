import { Button } from '@/app/_ui/Button';
import React from 'react'
import { useFormStatus } from 'react-dom';

interface SubmitBtnTypeProps {
  text: string;
  PendingText: string;
  disabled: boolean;
  className: string;
}

function SubmitBtn({
  text,
  disabled,
  PendingText,
  className,
}: SubmitBtnTypeProps) {
  const { pending } = useFormStatus();
  return (
    <button className={className} disabled={pending || disabled}>
      {pending ? PendingText : text}
    </button>
  );
}

export default SubmitBtn