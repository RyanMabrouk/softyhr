import React from 'react'

interface EmailDetailPropsType {
  name:string;
  description:string;
}
function EmailDetail({ name, description }: EmailDetailPropsType) {
  return (
    <div className="flex whitespace-nowrap items-start justify-start gap-2">
      <h1 className="font-base text-sm text-gray-29">{`${name}: `}</h1>
      <h1 className="font-base text-sm text-black">{description}</h1>
    </div>
  );
}

export default EmailDetail