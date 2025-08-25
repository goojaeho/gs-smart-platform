export interface Student {
  id: string;
  name: string;
  grade: number;
  school: string;
  centerId: string;
  level: number;
  points: number;
  weeklyStudyTime: number;
  subjects: {
    korean: number;
    english: number;
    math: number;
    science: number;
    social: number;
  };
}

export interface Teacher {
  id: string;
  name: string;
  centerId: string;
  centerName: string;
  studentCount: number;
}

export interface Parent {
  id: string;
  name: string;
  childrenIds: string[];
}

export interface Center {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  studentCount: number;
  attendanceRate: number;
  avgStudyTime: number;
}

export interface LearningContent {
  id: string;
  title: string;
  subject: string;
  grade: number;
  type: 'video' | 'quiz' | 'reading';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface MentoringSession {
  id: string;
  studentId: string;
  mentorId: string;
  date: string;
  duration: number;
  subject: string;
  content: string;
  type: 'learning' | 'emotional';
}

export const students: Student[] = [
  {
    id: 'ST001',
    name: '김민준',
    grade: 4,
    school: '경산초등학교',
    centerId: 'C001',
    level: 23,
    points: 2450,
    weeklyStudyTime: 12.5,
    subjects: {
      korean: 85,
      english: 78,
      math: 92,
      science: 88,
      social: 83
    }
  },
  {
    id: 'ST002',
    name: '이서연',
    grade: 5,
    school: '하양초등학교',
    centerId: 'C002',
    level: 28,
    points: 3120,
    weeklyStudyTime: 15.3,
    subjects: {
      korean: 92,
      english: 88,
      math: 85,
      science: 90,
      social: 87
    }
  },
  {
    id: 'ST003',
    name: '박지호',
    grade: 3,
    school: '압량초등학교',
    centerId: 'C004',
    level: 15,
    points: 1850,
    weeklyStudyTime: 10.2,
    subjects: {
      korean: 78,
      english: 72,
      math: 85,
      science: 80,
      social: 76
    }
  },
  {
    id: 'ST004',
    name: '최서진',
    grade: 6,
    school: '진량초등학교',
    centerId: 'C006',
    level: 35,
    points: 4200,
    weeklyStudyTime: 18.7,
    subjects: {
      korean: 95,
      english: 92,
      math: 88,
      science: 93,
      social: 90
    }
  },
  {
    id: 'ST005',
    name: '정유진',
    grade: 4,
    school: '경산초등학교',
    centerId: 'C013',
    level: 20,
    points: 2100,
    weeklyStudyTime: 11.5,
    subjects: {
      korean: 82,
      english: 75,
      math: 88,
      science: 85,
      social: 80
    }
  }
];

export const teachers: Teacher[] = [
  {
    id: 'T001',
    name: '김선생',
    centerId: 'C001',
    centerName: '한사지역아동센터',
    studentCount: 25
  },
  {
    id: 'T002',
    name: '이선생',
    centerId: 'C002',
    centerName: '금락지역아동센터',
    studentCount: 20
  },
  {
    id: 'T003',
    name: '박선생',
    centerId: 'C006',
    centerName: '진량지역아동센터',
    studentCount: 28
  },
  {
    id: 'T004',
    name: '최선생',
    centerId: 'C013',
    centerName: '경산지역아동센터',
    studentCount: 32
  },
  {
    id: 'T005',
    name: '정선생',
    centerId: 'C021',
    centerName: '아가페지역아동센터',
    studentCount: 35
  }
];

export const parents: Parent[] = [
  {
    id: 'P001',
    name: '김학부모',
    childrenIds: ['ST001']
  },
  {
    id: 'P002',
    name: '이학부모',
    childrenIds: ['ST002']
  },
  {
    id: 'P003',
    name: '박학부모',
    childrenIds: ['ST003']
  }
];

export const centers: Center[] = [
  {
    id: 'C001',
    name: '한사지역아동센터',
    location: { lat: 35.8250, lng: 128.7416 },
    studentCount: 39,
    attendanceRate: 92,
    avgStudyTime: 12.3
  },
  {
    id: 'C002',
    name: '금락지역아동센터',
    location: { lat: 35.8130, lng: 128.7280 },
    studentCount: 29,
    attendanceRate: 88,
    avgStudyTime: 11.8
  },
  {
    id: 'C003',
    name: '느티나무지역아동센터',
    location: { lat: 35.8370, lng: 128.7520 },
    studentCount: 19,
    attendanceRate: 90,
    avgStudyTime: 13.1
  },
  {
    id: 'C004',
    name: '봉황지역아동센터',
    location: { lat: 35.8520, lng: 128.7830 },
    studentCount: 39,
    attendanceRate: 85,
    avgStudyTime: 10.5
  },
  {
    id: 'C005',
    name: '윤성지역아동센터',
    location: { lat: 35.8730, lng: 128.7650 },
    studentCount: 19,
    attendanceRate: 93,
    avgStudyTime: 14.2
  },
  {
    id: 'C006',
    name: '진량지역아동센터',
    location: { lat: 35.8370, lng: 128.8520 },
    studentCount: 39,
    attendanceRate: 91,
    avgStudyTime: 12.8
  },
  {
    id: 'C007',
    name: '초원지역아동센터',
    location: { lat: 35.8450, lng: 128.7380 },
    studentCount: 29,
    attendanceRate: 89,
    avgStudyTime: 11.5
  },
  {
    id: 'C008',
    name: '황제지역아동센터',
    location: { lat: 35.8680, lng: 128.7750 },
    studentCount: 39,
    attendanceRate: 87,
    avgStudyTime: 12.1
  },
  {
    id: 'C009',
    name: '경동지역아동센터',
    location: { lat: 35.8150, lng: 128.7580 },
    studentCount: 19,
    attendanceRate: 94,
    avgStudyTime: 13.5
  },
  {
    id: 'C010',
    name: '헤세드지역아동센터',
    location: { lat: 35.8320, lng: 128.7450 },
    studentCount: 29,
    attendanceRate: 86,
    avgStudyTime: 11.2
  },
  {
    id: 'C011',
    name: '봄빛미소지역아동센터',
    location: { lat: 35.8550, lng: 128.7320 },
    studentCount: 19,
    attendanceRate: 92,
    avgStudyTime: 12.7
  },
  {
    id: 'C012',
    name: '참사랑나눔터지역아동센터',
    location: { lat: 35.8280, lng: 128.7680 },
    studentCount: 29,
    attendanceRate: 88,
    avgStudyTime: 11.9
  },
  {
    id: 'C013',
    name: '경산지역아동센터',
    location: { lat: 35.8180, lng: 128.7380 },
    studentCount: 39,
    attendanceRate: 90,
    avgStudyTime: 13.2
  },
  {
    id: 'C014',
    name: '사동지역아동센터',
    location: { lat: 35.8420, lng: 128.7550 },
    studentCount: 19,
    attendanceRate: 85,
    avgStudyTime: 10.8
  },
  {
    id: 'C015',
    name: '해피스쿨지역아동센터',
    location: { lat: 35.8620, lng: 128.7420 },
    studentCount: 29,
    attendanceRate: 91,
    avgStudyTime: 12.4
  },
  {
    id: 'C016',
    name: '장산지역아동센터',
    location: { lat: 35.8780, lng: 128.7850 },
    studentCount: 39,
    attendanceRate: 89,
    avgStudyTime: 11.7
  },
  {
    id: 'C017',
    name: '성암지역아동센터',
    location: { lat: 35.8350, lng: 128.7280 },
    studentCount: 29,
    attendanceRate: 87,
    avgStudyTime: 11.3
  },
  {
    id: 'C018',
    name: '남천지역아동센터',
    location: { lat: 35.8480, lng: 128.7620 },
    studentCount: 27,
    attendanceRate: 93,
    avgStudyTime: 13.8
  },
  {
    id: 'C019',
    name: '대천지역아동센터',
    location: { lat: 35.8250, lng: 128.7480 },
    studentCount: 29,
    attendanceRate: 86,
    avgStudyTime: 10.9
  },
  {
    id: 'C020',
    name: '예일지역아동센터',
    location: { lat: 35.8580, lng: 128.7720 },
    studentCount: 39,
    attendanceRate: 90,
    avgStudyTime: 12.6
  },
  {
    id: 'C021',
    name: '아가페지역아동센터',
    location: { lat: 35.8380, lng: 128.7350 },
    studentCount: 41,
    attendanceRate: 94,
    avgStudyTime: 14.1
  },
  {
    id: 'C022',
    name: '들꽃지역아동센터',
    location: { lat: 35.8650, lng: 128.7580 },
    studentCount: 29,
    attendanceRate: 88,
    avgStudyTime: 11.6
  }
];

export const learningContents: LearningContent[] = [
  {
    id: 'LC001',
    title: '소수와 합성수',
    subject: '수학',
    grade: 5,
    type: 'video',
    duration: 15,
    difficulty: 'medium'
  },
  {
    id: 'LC002',
    title: '용비어천가 읽기',
    subject: '국어',
    grade: 6,
    type: 'reading',
    duration: 20,
    difficulty: 'hard'
  },
  {
    id: 'LC003',
    title: 'Basic English Conversation',
    subject: '영어',
    grade: 4,
    type: 'video',
    duration: 12,
    difficulty: 'easy'
  },
  {
    id: 'LC004',
    title: '태양계의 구성',
    subject: '과학',
    grade: 5,
    type: 'video',
    duration: 18,
    difficulty: 'medium'
  },
  {
    id: 'LC005',
    title: '조선시대 생활문화',
    subject: '사회',
    grade: 5,
    type: 'reading',
    duration: 25,
    difficulty: 'medium'
  }
];

export const mentoringHistory: MentoringSession[] = [
  {
    id: 'M001',
    studentId: 'ST001',
    mentorId: 'MT001',
    date: '2024-01-15',
    duration: 30,
    subject: '수학',
    content: '분수의 덧셈과 뺄셈 개념 설명',
    type: 'learning'
  },
  {
    id: 'M002',
    studentId: 'ST002',
    mentorId: 'MT002',
    date: '2024-01-16',
    duration: 45,
    subject: '진로상담',
    content: '학습 습관 개선 및 목표 설정',
    type: 'emotional'
  },
  {
    id: 'M003',
    studentId: 'ST001',
    mentorId: 'MT001',
    date: '2024-01-17',
    duration: 35,
    subject: '영어',
    content: '현재진행형 문법 연습',
    type: 'learning'
  }
];

export const weeklyStudyData = [
  { day: '월', korean: 2.5, english: 1.8, math: 3.2, science: 1.5, social: 1.0 },
  { day: '화', korean: 2.0, english: 2.2, math: 2.8, science: 2.0, social: 1.5 },
  { day: '수', korean: 2.8, english: 2.0, math: 3.5, science: 1.8, social: 1.2 },
  { day: '목', korean: 2.2, english: 2.5, math: 3.0, science: 2.2, social: 1.8 },
  { day: '금', korean: 3.0, english: 2.8, math: 3.8, science: 2.5, social: 2.0 },
  { day: '토', korean: 1.5, english: 3.0, math: 2.5, science: 1.0, social: 0.8 },
  { day: '일', korean: 1.8, english: 2.5, math: 2.8, science: 1.5, social: 1.0 }
];

export const monthlyProgressData = [
  { month: '1월', score: 72 },
  { month: '2월', score: 75 },
  { month: '3월', score: 78 },
  { month: '4월', score: 82 },
  { month: '5월', score: 85 },
  { month: '6월', score: 88 }
];