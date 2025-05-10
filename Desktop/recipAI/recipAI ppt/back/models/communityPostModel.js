const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema({
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://i.pravatar.cc/150'
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required'],
    trim: true,
    maxLength: [500, 'Description cannot be more than 500 characters']
  },
  ingredients: {
    type: String,
    required: [true, 'Recipe ingredients are required'],
    trim: true
  },
  fullRecipe: {
    type: String,
    required: [true, 'Full recipe instructions are required'],
    trim: true
  },
  community: {
    type: String,
    required: [true, 'Community selection is required'],
    enum: ["Punjabi", "Bengali", "Gujarati", "South Indian", "Rajasthani", "Maharashtrian", "Kashmiri", "Goan"]
  },
  image: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  prepTime: {
    type: String,
    default: '30 mins'
  },
  calories: {
    type: String,
    default: '400 kcal'
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  cuisine: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: {
    type: Number,
    default: 0
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ tags: 1 });
communityPostSchema.index({ 'user._id': 1 });

// Virtual for likes count
communityPostSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for comments count
communityPostSchema.virtual('commentsCount').get(function() {
  return this.comments.length;
});

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

module.exports = CommunityPost;
