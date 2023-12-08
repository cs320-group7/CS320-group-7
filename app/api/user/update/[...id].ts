// import { NextApiRequest, NextApiResponse } from 'next';
// import { updateUser } from '../../../services/userService';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   if (!id || Array.isArray(id)) {
//     return res.status(400).json({ error: 'Invalid userId' });
//   }

//   if (req.method === 'PUT') {
//     try {
//       const updatedUser = await updateUser(Number(id), req.body);

//       res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//       res.end()
//     } catch (error) {
//       console.error('Error updating user:', error);
//       return res.status(500).json({ error: 'Failed to update user' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
// }