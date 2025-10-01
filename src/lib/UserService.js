import User from '../models/User.js';
import connectDB from './database/connectDB.js';

export class UserService {
  /**
   * Initialize database connection
   */
  static async init() {
    await connectDB();
  }

  /**
   * Get user data by username
   * @param {string} username 
   * @returns {Object|null} User data or null if not found
   */
  static async getUserData(username) {
    await this.init();
    
    try {
      const user = await User.findByUsername(username);
      
      if (user) {
        console.log(` Found cached data for: ${username}`);
        return user.userData; 
      }
      
      console.log(` No cached data found for: ${username}`);
      return null;
    } catch (error) {
      console.error(' Error fetching user:', error);
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  /**
   * Save user data after successful analysis
   * @param {string} username 
   * @param {Object} finalResultData - The finalResult object from AI analysis
   * @returns {Object} Saved user document
   */
  static async saveUserData(username, finalResultData) {
    await this.init();
    
    try {
      let existingUser = await User.findByUsername(username);
      
      if (existingUser) {
        console.log(` Updating existing user: ${username}`);
        
        existingUser.userData = finalResultData;
        return await existingUser.save();
      } else {
        console.log(` Creating new user: ${username}`);
        
        const newUser = new User({
          username,
          userData: finalResultData
        });
        
        return await newUser.save();
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw new Error(`Failed to save user data: ${error.message}`);
    }
  }

  /**
   * Check if user exists in database
   * @param {string} username 
   * @returns {boolean} True if user exists, false otherwise
   */
  static async userExists(username) {
    await this.init();
    
    try {
      const user = await User.findByUsername(username);
      return user !== null;
    } catch (error) {
      console.error(' Error checking user existence:', error);
      return false;
    }
  }

  /**
   * Delete user data
   * @param {string} username 
   * @returns {boolean} Success status
   */
  static async deleteUser(username) {
    await this.init();
    
    try {
      const result = await User.deleteOne({ username: username.toLowerCase().trim() });
      return result.deletedCount > 0;
    } catch (error) {
      console.error(' Error deleting user:', error);
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Get total number of users in database
   * @returns {number} Total user count
   */
  static async getTotalUsers() {
    await this.init();
    
    try {
      return await User.countDocuments();
    } catch (error) {
      console.error(' Error getting user count:', error);
      return 0;
    }
  }
}

export default UserService;