import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../services/userService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (req.method === 'PUT') {
    try {
      const updatedUser = await updateUser(Number(userId), req.body);

      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Failed to update user' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}