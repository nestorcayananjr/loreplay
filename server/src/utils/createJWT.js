import jwt from 'jsonwebtoken'

export const createJWT = (email, username, userId) => {
    const token = jwt.sign(
        { email, username, userId },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
    )

    return token;
}