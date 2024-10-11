export const register = (req, res) => {
  res.json({ msg: "register route is back again" });
};
export const login = (req, res) => {
  console.log(req.body);
  console.log("req.body");

  res.json({ msg: "login route" });
};
