import jwt from "jsonwebtoken";

const generateToken = (userId: number): string => {
  const token = jwt.sign(
    {
      id: userId,
    
    },
    process.env.JWT_SECRET || "OGebj_*^5?>{N+E=o"
  );
  return token;
};

export default generateToken;
