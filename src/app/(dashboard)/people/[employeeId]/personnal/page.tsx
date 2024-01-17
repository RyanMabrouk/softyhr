"use client";

import UserSection from "../../components/UserSection";

interface PersonnalTypeProps {
  params: { employeeId: string };
}
function Personnal({ params: { employeeId } }: PersonnalTypeProps) {
  return <UserSection employeeId={employeeId} section="personnal" />;
}

export default Personnal;
