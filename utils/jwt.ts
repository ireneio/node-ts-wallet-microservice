import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken'

const audience: string = 'student-questionnaire-api-node'

export default async function createJWT(iss: string = 'qapi', kid: string = 'qapi-refresh', filepath?: string): Promise<string | undefined> {
  const payload = {
    iss,
    // <= 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    aud: audience,
    iat: Date.now()
  }

  // return Promise.resolve(jwt.sign(payload, privateKey, { keyid: kid, algorithm: 'HS256' }))
  return Promise.resolve(jwt.sign(payload, 'secret', { keyid: kid, algorithm: 'HS256' }))
}

export function decodeJWT(token: string, issuer: string): boolean {
  let err = null
  let decoded
  try {
    decoded = jwt.verify(token, 'secret', { audience, issuer, algorithms: ['HS256'] })
  } catch(e) {
    err = e
  } finally {
    function verify(err: JsonWebTokenError | NotBeforeError | TokenExpiredError | null, decoded: string | object | undefined): boolean {
      if(err instanceof TokenExpiredError) {
        throw new Error('401')
      } else if(err) {
        throw new Error(err.message)
      } else {
        return true
      }
    }
    return verify(err, decoded)
  }
}
