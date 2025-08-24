# Claude Development Guide - GS Smart Platform

## Project Overview
This project is implementing a comprehensive redesign of the GS Smart Platform based on detailed requirements from `website develop.pdf`. The implementation follows the roadmap outlined in `IMPLEMENTATION_PLAN.md`.

## Current Status
- **Phase**: Phase 1 Complete - Design System Updates
- **Next Phase**: Phase 2 - Student Dashboard Core Implementation
- **Priority**: High Priority items from implementation plan

### Phase 1 Completed ✅
- ✅ Updated color scheme in `tailwind.config.js` to PDF requirements (#0397D6, #63C29D)
- ✅ Created `HorizontalNav.tsx` component with 8 student menu items
- ✅ Updated `Layout.tsx` to use horizontal navigation instead of sidebar
- ✅ Updated `LandingGov.tsx` with new branding, colors, and Quick Navigation section
- ✅ Added all required menu items from PDF specifications
- ✅ Updated `Header.tsx` to match LandingGov government-style layout with utility bar
- ✅ Added font size controls and language selection to role pages
- ✅ Implemented Quick Navigation redirects with login handling

## Key Requirements Summary
Based on the PDF analysis, the platform needs:

### Design Changes
- **Colors**: Update to Blue (#0397D6) and Green (#63C29D)
- **Layout**: Convert from vertical sidebar to horizontal menu navigation
- **Branding**: Update to match PDF specifications

### Student Dashboard (러닝메이트)
- **8 Menu Items**: 러닝메이트, 오늘의 학습, 문제풀이, 온라인 도서관, 질문방, 멘토링, 알림장, 포인트샵
- **New Features**: Character progression system, mission-based learning, emotional AI support
- **Enhanced Features**: Video-like thumbnails, real book displays, eBook reader UI

### Teacher Dashboard
- **Layout**: Horizontal dashboard with comprehensive overview
- **Management**: Enhanced student progress tracking, Q&A with drawing canvas
- **New Services**: AI Learning Diagnosis, mentoring room creation, notice board management

### Parent Dashboard  
- **Summary Page**: Child growth records, subject analytics, reading progress
- **Analytics**: Period-based trends, teacher comments, consultation history

## Development Commands
```bash
# Development server
npm run dev

# Build project
npm run build

# Linting
npm run lint

# Preview build
npm run preview
```

## Project Structure
```
src/
├── components/
│   ├── common/          # Shared components (Layout, Header, Sidebar)
│   └── [role]/          # Role-specific components
├── pages/
│   ├── student/         # Student pages
│   ├── teacher/         # Teacher pages  
│   ├── parent/          # Parent pages
│   └── admin/           # Admin pages
├── store/               # Zustand state management
├── data/                # Mock data
└── types/               # TypeScript definitions
```

## Implementation Priority Order

### Phase 1: Foundation (Weeks 1-2)
1. **Color Scheme Update** 
   - Update `tailwind.config.js`
   - Apply new colors throughout components
   
2. **Layout Migration**
   - Convert sidebar to horizontal menu
   - Update Layout component structure
   
3. **Landing Page Updates**
   - Update branding and menu items
   - Add quick navigation section

### Phase 2: Student Dashboard Core (Weeks 3-4)  
1. **Horizontal Menu Implementation**
   - Create new navigation component
   - Implement 8 required menu items
   
2. **Learning Mate System**
   - Character progression interface
   - Mission-based learning display
   - Level-up system with rewards
   
3. **Enhanced Learning Pages**
   - Video-like thumbnails for Today's Learning
   - Problem Solving module for Grade 3 math
   - Results page with detailed explanations

### Phase 3: Advanced Features (Weeks 5-6)
1. **Online Library Enhancement**
   - Real book thumbnails
   - Grade-level recommendations
   - eBook reader interface
   
2. **Communication Features**
   - Q&A bulletin board system
   - Notice board implementation
   - Mentoring journal system

## Technical Notes

### Current Technology Stack
- **Frontend**: React 19.1.1 + TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 7.8.1
- **State**: Zustand 5.0.8  
- **Charts**: Recharts 3.1.2
- **Icons**: Lucide React 0.540.0

### Key Files to Update First
1. `tailwind.config.js` - Color scheme
2. `src/components/common/Layout.tsx` - Navigation structure
3. `src/components/common/Sidebar.tsx` - Convert to horizontal menu
4. `src/pages/StudentDashboard.tsx` - Dashboard restructure

### New Components Needed
```
/components/student/
├── LearningMate/
│   ├── CharacterDisplay.tsx
│   ├── LevelProgress.tsx  
│   ├── MissionBoard.tsx
│   └── EmotionalSupport.tsx
├── ProblemSolving/
│   ├── MathProblem.tsx
│   ├── ResultsPage.tsx
│   └── ProgressTracker.tsx
└── HorizontalMenu.tsx
```

## Development Guidelines

### Code Style
- Follow existing TypeScript patterns
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Follow component naming conventions

### Testing Strategy
- Test component functionality individually
- Validate responsive design across devices
- Check color scheme consistency
- Test user flows for each role

### Performance Considerations
- Implement code splitting for large features
- Optimize image loading for thumbnails
- Use lazy loading where appropriate
- Monitor bundle size

## Reference Materials
- **Requirements**: `website develop.pdf`
- **Implementation Plan**: `IMPLEMENTATION_PLAN.md`
- **Current Site**: https://gs-smart-platform.vercel.app/
- **Reference Site**: https://devdcu.cbe.go.kr/
- **GitHub**: https://github.com/goojaeho/gs-smart-platform.git

## Next Steps
1. **Immediate**: Start Phase 1 with color scheme updates
2. **Priority**: Implement horizontal menu navigation  
3. **Focus**: Student dashboard Learning Mate feature
4. **Testing**: Validate each phase before proceeding

## Development Notes
- All changes should maintain existing functionality while adding new features
- Keep user experience consistent across all roles
- Maintain existing authentication and routing structure
- Follow responsive design patterns from current implementation

## Questions for User
When ready to proceed:
1. Which phase would you like to start with?
2. Any specific features to prioritize?
3. Should we maintain backward compatibility with current layout?
4. Any additional requirements not covered in the PDF?

---
*Last Updated: 2025-01-24*
*Status: Ready to begin Phase 1 implementation*