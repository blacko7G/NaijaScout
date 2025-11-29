import Player from './models/Player.js';
import connectDB from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const samplePlayers = [
  {
    name: 'Victor Osimhen',
    position: 'Forward',
    age: 24,
    nationality: 'Nigerian',
    club: 'Napoli',
    engagement: {
      goals: 26,
      assists: 4,
      interactions: 45,
      matches: 32,
      minutes: 2880
    },
    stats: {
      pace: 89,
      shooting: 85,
      passing: 64,
      dribbling: 78,
      defending: 35,
      physical: 82
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Samuel Chukwueze',
    position: 'Forward',
    age: 24,
    nationality: 'Nigerian',
    club: 'AC Milan',
    engagement: {
      goals: 6,
      assists: 3,
      interactions: 28,
      matches: 25,
      minutes: 1800
    },
    stats: {
      pace: 87,
      shooting: 72,
      passing: 68,
      dribbling: 84,
      defending: 42,
      physical: 65
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Wilfred Ndidi',
    position: 'Midfielder',
    age: 26,
    nationality: 'Nigerian',
    club: 'Leicester City',
    engagement: {
      goals: 2,
      assists: 1,
      interactions: 35,
      matches: 28,
      minutes: 2520
    },
    stats: {
      pace: 65,
      shooting: 58,
      passing: 72,
      dribbling: 68,
      defending: 85,
      physical: 82
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Alex Iwobi',
    position: 'Midfielder',
    age: 27,
    nationality: 'Nigerian',
    club: 'Fulham',
    engagement: {
      goals: 5,
      assists: 7,
      interactions: 42,
      matches: 30,
      minutes: 2700
    },
    stats: {
      pace: 76,
      shooting: 68,
      passing: 78,
      dribbling: 75,
      defending: 62,
      physical: 70
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'William Troost-Ekong',
    position: 'Defender',
    age: 30,
    nationality: 'Nigerian',
    club: 'PAOK',
    engagement: {
      goals: 3,
      assists: 1,
      interactions: 25,
      matches: 26,
      minutes: 2340
    },
    stats: {
      pace: 58,
      shooting: 45,
      passing: 65,
      dribbling: 52,
      defending: 82,
      physical: 85
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Kelechi Iheanacho',
    position: 'Forward',
    age: 27,
    nationality: 'Nigerian',
    club: 'Leicester City',
    engagement: {
      goals: 8,
      assists: 5,
      interactions: 38,
      matches: 22,
      minutes: 1584
    },
    stats: {
      pace: 72,
      shooting: 78,
      passing: 70,
      dribbling: 75,
      defending: 45,
      physical: 68
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Frank Onyeka',
    position: 'Midfielder',
    age: 25,
    nationality: 'Nigerian',
    club: 'Brentford',
    engagement: {
      goals: 1,
      assists: 2,
      interactions: 32,
      matches: 24,
      minutes: 1920
    },
    stats: {
      pace: 75,
      shooting: 55,
      passing: 68,
      dribbling: 70,
      defending: 78,
      physical: 80
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Calvin Bassey',
    position: 'Defender',
    age: 23,
    nationality: 'Nigerian',
    club: 'Fulham',
    engagement: {
      goals: 1,
      assists: 2,
      interactions: 28,
      matches: 25,
      minutes: 2250
    },
    stats: {
      pace: 72,
      shooting: 42,
      passing: 68,
      dribbling: 65,
      defending: 78,
      physical: 82
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Ademola Lookman',
    position: 'Forward',
    age: 26,
    nationality: 'Nigerian',
    club: 'Atalanta',
    engagement: {
      goals: 13,
      assists: 6,
      interactions: 40,
      matches: 29,
      minutes: 2610
    },
    stats: {
      pace: 84,
      shooting: 75,
      passing: 70,
      dribbling: 82,
      defending: 48,
      physical: 65
    },
    status: 'active',
    image: '/avatar-icon.png'
  },
  {
    name: 'Stanley Nwabili',
    position: 'Goalkeeper',
    age: 27,
    nationality: 'Nigerian',
    club: 'Chippa United',
    engagement: {
      goals: 0,
      assists: 0,
      interactions: 15,
      matches: 20,
      minutes: 1800
    },
    stats: {
      pace: 45,
      shooting: 25,
      passing: 55,
      dribbling: 30,
      defending: 85,
      physical: 75
    },
    status: 'active',
    image: '/avatar-icon.png'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Player.deleteMany({});
    console.log('🗑️  Cleared existing players');
    
    // Insert sample data
    const players = await Player.insertMany(samplePlayers);
    console.log(`✅ Seeded ${players.length} players successfully`);
    
    // Display some stats
    const totalPlayers = await Player.countDocuments();
    const avgScoutPoints = await Player.aggregate([
      { $group: { _id: null, avg: { $avg: '$scoutPoints' } } }
    ]);
    
    console.log(`📊 Total players: ${totalPlayers}`);
    console.log(`📈 Average scout points: ${Math.round(avgScoutPoints[0]?.avg || 0)}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();






