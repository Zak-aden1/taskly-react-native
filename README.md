# Taskly - React Native Learning Project

A React Native application built to learn key concepts and modern practices in mobile app development.

## Key Learning Points

### 1. Navigation
- Using [expo-router](https://docs.expo.dev/router/introduction/) for type-safe navigation
- Implementation of tab navigation with custom icons
- Stack navigation for nested screens (Counter → History)
- Using `Link` and `useRouter` for programmatic navigation

### 2. State Management
- Local state management using React's [useState](https://react.dev/reference/react/useState) and [useEffect](https://react.dev/reference/react/useEffect)
- Persistent storage with [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- Custom storage utility functions for data persistence

### 3. UI Components & Styling
- Custom components creation (`TimeSegment`, `ShoppingListItem`)
- [StyleSheet](https://reactnative.dev/docs/stylesheet) implementation for consistent styling
- Theme management using a centralized theme object
- Responsive layouts using [Flexbox](https://reactnative.dev/docs/flexbox)
- Animation with [LayoutAnimation](https://reactnative.dev/docs/layoutanimation)
- Custom icons using [@expo/vector-icons](https://docs.expo.dev/guides/icons/)

### 4. User Interaction
- Touch handling with [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) and [Pressable](https://reactnative.dev/docs/pressable)
- Input handling with [TextInput](https://reactnative.dev/docs/textinput)
- List rendering with [FlatList](https://reactnative.dev/docs/flatlist) and [ScrollView](https://reactnative.dev/docs/scrollview)
- Pull-to-refresh and loading states
- Haptic feedback using [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)

### 5. Notifications
- Push notification setup with [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)
- Permission handling for notifications
- Scheduled notifications with custom triggers
- Device-specific notification channel setup for Android

### 6. TypeScript Integration
- Type definitions for component props
- Interface definitions for data structures
- Type-safe state management
- Proper typing for navigation parameters
- [TypeScript with React Native guide](https://reactnative.dev/docs/typescript)

### 7. Features Implemented
- Shopping list with add/delete/complete functionality
- Countdown timer with notification reminders
- History tracking for completed items
- Confetti animation using [react-native-confetti-cannon](https://www.npmjs.com/package/react-native-confetti-cannon)

### 8. Development Tools
- [ESLint](https://eslint.org/) configuration for code quality
- [Prettier](https://prettier.io/) for code formatting
- Custom ESLint rules for React Native
- TypeScript configuration for type safety

## Project Structure
```
├── app/                    # Main application screens
│   ├── counter/           # Counter feature
│   ├── _layout.tsx        # Root layout configuration
│   └── index.tsx          # Home screen
├── components/            # Reusable components
├── utils/                 # Utility functions
└── theme.ts              # Global styling constants
```

## Useful Resources
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

## Getting Started
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Follow the Expo CLI instructions to run on your device or simulator # taskly-react-native
