import React from 'react'
import UserSection from '../../components/UserSection'
interface PersonnalTypeProps {
  params: { employeeId: string };
}
function page({ params: { employeeId } }: PersonnalTypeProps) {
  return <UserSection employeeId={employeeId} section="job" />;
}

export default page