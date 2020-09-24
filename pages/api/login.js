import { Magic } from '@magic-sdk/admin'
import Iron from '@hapi/iron'
import Cookie from '../../lib/cookie'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  if (process.env.NEXT_PUBLIC_DEVELOPMENT) {
    const user = { email: 'test@theteacherfund.com' }
    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
    Cookie.setTokenCookie(res, token)

    return res.end()
  }

  const magicId = magic.utils.parseAuthorizationHeader(req.headers.authorization)
  const user = await magic.users.getMetadataByToken(magicId)

  const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults)
  Cookie.setTokenCookie(res, token)

  res.end()
}
