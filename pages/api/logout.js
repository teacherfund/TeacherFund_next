import { Magic } from '@magic-sdk/admin'
import Cookie from '../../lib/cookie'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async (req, res) => {
  if (req.isAuthenticated()) {
    Cookie.removeAuthCookie(res)
    await magic.users.logoutByIssuer(req.user.issuer)
    req.logout()
    return res.status(200).end()
  }

  res.end()
}
