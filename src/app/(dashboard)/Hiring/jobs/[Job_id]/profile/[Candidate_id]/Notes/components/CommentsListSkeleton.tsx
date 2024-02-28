import React from 'react'
import CommentSkeleton from './CommentSkeleton'

function CommentsListSkeleton() {
  return (
    <div className="flex w-full mt-[2rem] flex-col items-start justify-center gap-[1rem] p-4">
      <CommentSkeleton className="ml-[4rem] self-start" />
      <CommentSkeleton className="self-end" />
      <CommentSkeleton className="ml-[4rem] self-start" />
      <CommentSkeleton className="self-end" />
      <CommentSkeleton className="ml-[4rem] self-start" />
      <CommentSkeleton className="self-end" />
      <CommentSkeleton className="ml-[4rem] self-start" />
    </div>
  );
}

export default CommentsListSkeleton