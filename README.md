# SmartKid - Gamified English Learning Platform

SmartKid is an interactive mobile application designed to help young learners (ages 3-12) improve their English vocabulary through engaging flip card games. The app features dual-role authentication for students and parents, with comprehensive progress tracking and parental controls.

## Features

### Student Features
- **Interactive Flip Card Games**: Memory-based card matching games with English-Vietnamese vocabulary
- **Multiple Categories**: Animals, Fruits, Vehicles, and Colors
- **Difficulty Levels**: Easy (4 cards), Medium (6 cards), Hard (8 cards)
- **Scoring System**: Points earned with combo multipliers for consecutive correct matches
- **Time-Based Challenges**: Difficulty-adjusted timers (Easy: 2min, Medium: 3min, Hard: 4min)
- **Achievement Badges**: Unlock badges for milestones (First Game, 5 Games, 10 Games, High Score, Perfect Week)
- **Progress Tracking**: Real-time score, moves counter, and accuracy percentage

### Parent Features
- **Student Progress Dashboard**: Monitor multiple children's learning progress
- **Performance Analytics**: 
  - Weekly performance charts
  - Category-based performance breakdown
  - Accuracy and scoring trends
- **Achievement Tracking**: View unlocked badges and milestones
- **Time Management**: Set and monitor daily play time limits
- **Detailed Statistics**: Total points, games played, average scores, and learning insights
- **Dual View Modes**: Overview and detailed analytics views

### Authentication
- **Dual-Role System**: Separate login flows for students and parents
- **Email Validation**: Proper email format verification
- **Password Requirements**: Minimum 6 characters
- **Age Verification**: Students must be between 3-12 years old
- **Demo Credentials**:
  - Student: `hoa@smartkid.com` / `password123`
  - Parent: `parent@smartkid.com` / `password123`

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **State Management**: React Context API
- **UI Components**: Custom kid-friendly components
- **Styling**: React Native StyleSheet
- **Navigation**: Custom screen-based navigation

## Project Structure

\`\`\`
smartkid/
├── src/
│   ├── App.tsx                          # Main app entry point with navigation
│   ├── context/
│   │   ├── AuthContext.tsx              # Authentication state management
│   │   └── GameContext.tsx              # Game state management
│   ├── screens/
│   │   ├── LoginScreen.tsx              # Login/signup screen
│   │   ├── StudentHomeScreen.tsx        # Category & difficulty selection
│   │   ├── GameScreen.tsx               # Flip card game
│   │   └── ParentDashboardScreen.tsx    # Parent monitoring dashboard
│   ├── components/
│   │   ├── Button.tsx                   # Reusable button component
│   │   ├── Card.tsx                     # Card container component
│   │   ├── Badge.tsx                    # Achievement badge component
│   │   ├── ProgressRing.tsx             # Circular progress indicator
│   │   ├── LoadingSpinner.tsx           # Loading animation
│   │   ├── ScoreDisplay.tsx             # Score display component
│   │   ├── CategoryIcon.tsx             # Category selector component
│   │   └── index.ts                     # Component exports
│   └── types/
│       └── index.ts                     # TypeScript interfaces
├── app/
│   ├── layout.tsx                       # Next.js layout (for web support)
│   └── globals.css                      # Global styles
├── app.json                             # Expo configuration
├── package.json                         # Dependencies
└── README.md                            # This file
\`\`\`

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd smartkid
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Run on device/emulator**
   - **iOS**: Press `i` in the terminal
   - **Android**: Press `a` in the terminal
   - **Web**: Press `w` in the terminal

## Game Mechanics

### Flip Card Game
1. **Objective**: Match all card pairs by flipping cards to reveal English-Vietnamese vocabulary
2. **Gameplay**:
   - Tap cards to flip and reveal the word and image
   - Match pairs with the same English word
   - Earn 10 base points per match
   - Combo multiplier increases with consecutive matches (1.1x, 1.2x, etc.)
   - Time bonus awarded for completing within time limit

3. **Scoring**:
   - Base score: 10 points per match
   - Combo multiplier: +10% per consecutive match
   - Time bonus: 2 points per remaining second
   - Accuracy: Percentage of correct matches

4. **Difficulty Impact**:
   - **Easy**: 4 cards (8 total), 2 minutes, lower combo multiplier
   - **Medium**: 6 cards (12 total), 3 minutes, standard combo
   - **Hard**: 8 cards (16 total), 4 minutes, higher combo multiplier

## Authentication System

### Login Flow
1. Select role (Student or Parent)
2. Enter email and password
3. Validation checks:
   - Email format validation
   - Password minimum 6 characters
   - Role-based user lookup
4. On success: Navigate to appropriate dashboard

### Signup Flow
1. Select role (Student or Parent)
2. Enter name, email, password
3. If student: Enter age (3-12)
4. Validation checks:
   - All fields required
   - Email format validation
   - Password minimum 6 characters
   - Age range validation for students
   - Duplicate email check
5. On success: Create account and navigate to dashboard

### Demo Credentials
For testing purposes, use these pre-configured accounts:

**Student Account**
- Email: `hoa@smartkid.com`
- Password: `password123`
- Age: 5

**Parent Account**
- Email: `parent@smartkid.com`
- Password: `password123`

## Component Documentation

### Button Component
\`\`\`tsx
<Button
  onPress={() => handlePress()}
  variant="primary"      // primary | secondary | success | danger
  size="medium"          // small | medium | large
  disabled={false}
>
  Click Me
</Button>
\`\`\`

### Card Component
\`\`\`tsx
<Card variant="default">  // default | elevated | outlined
  {/* Card content */}
</Card>
\`\`\`

### Badge Component
\`\`\`tsx
<Badge
  emoji="🏆"
  label="Achievement"
  description="Achievement description"
/>
\`\`\`

### ScoreDisplay Component
\`\`\`tsx
<ScoreDisplay
  score={450}
  maxScore={1000}
  label="Total Score"
  size="large"           // small | medium | large
/>
\`\`\`

### ProgressRing Component
\`\`\`tsx
<ProgressRing
  percentage={75}
  size={100}
  label="Progress"
/>
\`\`\`

### LoadingSpinner Component
\`\`\`tsx
<LoadingSpinner
  size={50}
  color="#FF6B9D"
/>
\`\`\`

## Parent Dashboard Features

### Overview Mode
- Quick stats: Total points, games played, average score
- Weekly insights: Average score, trend analysis, best category
- Favorite category display
- Daily play time tracking
- Achievement badges

### Detailed Mode
- Category performance breakdown with bar charts
- Weekly performance line chart
- Detailed statistics table
- Achievement badges with descriptions

### Time Management
- Set daily play time limits
- Monitor current session time usage
- Visual progress indicator
- Parental controls for screen time

## Data Models

### User
\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
  role: "parent" | "student"
  password: string
  age?: number  // For students only
}
\`\`\`

### GameCard
\`\`\`typescript
interface GameCard {
  id: string
  vietnameseName: string
  englishName: string
  image: string
  category: string
  pronunciation: string
}
\`\`\`

### GameSession
\`\`\`typescript
interface GameSession {
  id: string
  studentId: string
  category: string
  level: "easy" | "medium" | "hard"
  score: number
  correctAnswers: number
  totalCards: number
  duration: number
  date: string
}
\`\`\`

## Color Scheme

- **Primary**: #FF6B9D (Pink)
- **Secondary**: #FFD4E5 (Light Pink)
- **Success**: #6BCB77 (Green)
- **Danger**: #FF6B6B (Red)
- **Background**: #FFF5F7 (Very Light Pink)
- **Text**: #333 (Dark Gray)
- **Muted**: #999 (Light Gray)

## Future Enhancements

- [ ] Sound effects and background music
- [ ] Pronunciation audio playback
- [ ] Leaderboard system
- [ ] Social sharing of achievements
- [ ] Customizable avatars
- [ ] Multiple language support
- [ ] Offline mode with data sync
- [ ] Backend API integration
- [ ] Cloud save functionality
- [ ] Advanced analytics and reports
- [ ] Adaptive difficulty based on performance
- [ ] Multiplayer game modes
- [ ] In-app rewards and shop system
- [ ] Parent notifications and alerts

## Development Guidelines

### Adding New Categories
1. Add cards to `MOCK_CARDS` in `GameContext.tsx`
2. Update category list in `StudentHomeScreen.tsx`
3. Ensure each category has at least 4 card pairs

### Adding New Components
1. Create component file in `src/components/`
2. Export from `src/components/index.ts`
3. Document props and usage in README

### Styling Conventions
- Use React Native StyleSheet for performance
- Follow the established color scheme
- Maintain consistent border radius (12px for buttons, 16px for cards)
- Use padding/margin from the spacing scale

## Testing Demo Accounts

### Student Flow
1. Login with student credentials
2. Select a category (Animals, Fruits, Vehicles, Colors)
3. Choose difficulty level
4. Play the flip card game
5. View results and achievements

### Parent Flow
1. Login with parent credentials
2. Select a child to monitor
3. View overview statistics
4. Switch to detailed view for analytics
5. Check achievement badges

## Troubleshooting

### App Won't Start
- Clear cache: `expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Emulator Issues
- Restart emulator
- Clear Expo cache: `expo start --clear`
- Check Node.js version compatibility

### Login Issues
- Verify email format
- Check password is at least 6 characters
- Ensure role selection matches account type

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request with description

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the repository or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Developed with**: React Native, Expo, TypeScript
