import jwt from 'jsonwebtoken'

export const createJWT = (email: string, username: string, id: number) => {
    const token = jwt.sign(
        { email, username, id },
        process.env.JWT_SECRET as jwt.PrivateKey,
        { expiresIn: '1d' },
    )

    return token;
}