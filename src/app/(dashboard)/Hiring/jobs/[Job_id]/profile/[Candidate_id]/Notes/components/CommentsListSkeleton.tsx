import React from 'react'
import CommentSkeleton from './CommentSkeleton'

function CommentsListSkeleton() {
  return (
    <div className='p-6 flex flex-col items-center justify-start gap-[1rem]'>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </div>
  );
}

export default CommentsListSkeleton