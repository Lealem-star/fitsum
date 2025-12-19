/**
 * Script to create admin users
 * 
 * Usage:
 *   node server/scripts/createAdmin.js
 *   (Creates first admin if no users exist)
 * 
 * Or with custom values:
 *   node server/scripts/createAdmin.js "Admin Name" "admin@example.com" "password123"
 * 
 * To force create even when users exist (use with caution):
 *   node server/scripts/createAdmin.js "Admin Name" "admin@example.com" "password123" --force
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-app';

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get arguments
    const name = process.argv[2] || 'System Admin';
    const email = process.argv[3] || 'admin@example.com';
    const password = process.argv[4] || 'admin123';
    const force = process.argv.includes('--force');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(`❌ User with email ${email} already exists!`);
      console.log(`   Please use a different email address.`);
      process.exit(1);
    }

    // Check if any users exist
    const userCount = await User.countDocuments();
    if (userCount > 0 && !force) {
      console.log('⚠️  Users already exist in the database.');
      console.log('   To create additional admins:');
      console.log('   1. Login as an existing admin');
      console.log('   2. Use the registration API with your auth token');
      console.log('   3. Or run this script with --force flag (use with caution)');
      console.log('\n   Example:');
      console.log(`   node scripts/createAdmin.js "${name}" "${email}" "${password}" --force`);
      process.exit(1);
    }

    if (force && userCount > 0) {
      console.log('⚠️  WARNING: Force creating admin even though users exist.');
      console.log('   Make sure you have permission to do this.\n');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const admin = new User({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    console.log('\n✅ Admin account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name:     ${name}`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('   You can now login at: /admin-portal/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
