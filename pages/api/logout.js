import Iron from '@hapi/iron'
import { Magic } from '@magic-sdk/admin'
import Cookie from '../../lib/cookie'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async (req, res) => {
  try {
    const user = await Iron.unseal(Cookie.getAuthToken(req.cookies), process.env.ENCRYPTION_SECRET, Iron.defaults)
    Cookie.removeAuthCookie(res)
    await magic.users.logoutByIssuer(user.issuer)
    return res.status(200).end()
  } catch (e) {}

  res.end()
}
