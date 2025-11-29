import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  position: {
    type: String,
    enum: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'],
    default: 'Forward'
  },
  age: {
    type: Number,
    min: [16, 'Age must be at least 16'],
    max: [50, 'Age cannot be more than 50']
  },
  nationality: {
    type: String,
    default: 'Nigerian'
  },
  club: {
    type: String,
    trim: true
  },
  engagement: {
    goals: {
      type: Number,
      default: 0,
      min: 0
    },
    assists: {
      type: Number,
      default: 0,
      min: 0
    },
    interactions: {
      type: Number,
      default: 0,
      min: 0
    },
    matches: {
      type: Number,
      default: 0,
      min: 0
    },
    minutes: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  stats: {
    pace: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    shooting: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    passing: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    dribbling: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    defending: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    physical: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    }
  },
  scoutPoints: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'scouted', 'signed'],
    default: 'active'
  },
  image: {
    type: String,
    default: '/avatar-icon.png'
  },
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

// Calculate scout points before saving
playerSchema.pre('save', function(next) {
  this.scoutPoints = this.engagement.goals + 
                    (this.engagement.assists * 2) + 
                    this.engagement.interactions;
  next();
});

// Virtual for overall rating
playerSchema.virtual('overallRating').get(function() {
  const stats = this.stats;
  return Math.round((stats.pace + stats.shooting + stats.passing + 
                    stats.dribbling + stats.defending + stats.physical) / 6);
});

// Ensure virtual fields are serialized
playerSchema.set('toJSON', { virtuals: true });
playerSchema.set('toObject', { virtuals: true });

const Player = mongoose.model('Player', playerSchema);

export default Player;

