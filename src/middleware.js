/* eslint-disable unicorn/no-empty-file */
/* eslint-disable unicorn/no-null */

import { NextResponse } from 'next/server';

const middleware = (request) => {
  const basicAuth = request.headers.get('Authorization');

  console.log('🚀 ~  file: middleware.js:9 ~  middleware ~  basicAuth:', basicAuth);

  return NextResponse.next();

  /*   if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // atob is deprecated but Buffer.from is not available in Next.js edge.
    const [user, password] = atob(authValue).split(':');

    if (user === 'kevin' && password === '5062') {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
    );
  }
  return NextResponse.json(
    { error: 'Please enter credentials' },
    { headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }, status: 401 }
  ); */
};

export default middleware;
