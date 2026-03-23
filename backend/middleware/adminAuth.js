const LEGACY_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PRIVATE_PASSWORD = process.env.ADMIN_PRIVATE_PASSWORD || LEGACY_ADMIN_PASSWORD || 'admin@9878';

const requireAdmin = (req, res, next) => {
  const suppliedPassword = req.headers['x-admin-password'];

  if (!suppliedPassword || suppliedPassword !== ADMIN_PRIVATE_PASSWORD) {
    return res.status(403).json({ error: 'Admin access denied' });
  }

  return next();
};

module.exports = { requireAdmin };
