import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/userModel.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB();

    const usersToUpdate = await User.find({
      $and: [
        { $or: [ { primaryEmail: { $exists: false } }, { primaryEmail: null }, { primaryEmail: '' } ] },
        { email: { $exists: true, $ne: null } }
      ]
    });

    console.log(`Found ${usersToUpdate.length} users to migrate`);

    let updated = 0;
    for (const user of usersToUpdate) {
      // Use legacy `email` field if present
      if (user.email) {
        user.primaryEmail = user.email;
        await user.save();
        updated++;
      }
    }

    console.log(`Updated ${updated} users.`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

run();