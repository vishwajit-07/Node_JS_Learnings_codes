const auth = (req, res, next) => {
  if (!req.session.loginID) {
    return res.send(
      `<script>alert('Session expired!!'); window.location.assign('/')</script>`,
    );
  }
  next();
};

module.exports = auth;
