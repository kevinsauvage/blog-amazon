/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import apiCalls from '@/lib/api';

const { postComment } = apiCalls;

export async function POST(request) {
  try {
    const body = await request.json();
    const { comment, email, name, postId, threadOf } = body || {};

    if (!comment || !email || !name || !postId) {
      return NextResponse.json({ error: 'Missing body params' }, { status: 400 });
    }

    const commentResponse = await postComment({
      comment,
      email,
      name,
      postId,
      threadOf,
    });

    const { error } = commentResponse || {};

    // And error occurred, send it to client. Error contains usefull error message.
    if (error) return NextResponse.json({ error }, { status: 400 });
    // No error occurred, send new created comment to client
    return NextResponse.json({ response: commentResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.stack }, { status: 500 });
  }
}
