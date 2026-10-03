export const STAGE_DATA = [
  {
    id: 'newborn',
    name: 'Newborn (0-3m)',
    ageRange: '0 - 3 Months',
    badge: 'Fourth Trimester',
    color: 'from-emerald-50 to-teal-100/60 border-teal-200',
    iconName: 'Baby',
    tagline: 'Building foundational security, feeding routines & bond attachment',
    keyFocus: ['Crying Interpretation', 'Exclusive Breastfeeding / Formula', 'Tummy Time', 'Sleep Rhythm'],
    articles: [
      {
        title: 'Decoding Newborn Cries: Hunger, Overstimulation or Wet Diaper?',
        readTime: '4 min read',
        author: 'Dr. Ananya Roy (Pediatric Specialist)',
        excerpt: 'Learn the subtle acoustic cues (the "Neh" vs "Owh" sound reflexes) to instantly understand your baby’s needs.',
        tags: ['Newborn', 'Crying', 'Soothing']
      },
      {
        title: 'Safe Sleep Practices: Avoiding SIDS & Establishing Day-Night Cycles',
        readTime: '6 min read',
        author: 'Dr. Sameer Sen (Child Health)',
        excerpt: 'Back-to-sleep guidelines, room temperature optimization, and natural light exposure for circadian alignment.',
        tags: ['Sleep', 'Safety']
      }
    ],
    nutrition: {
      summary: 'Exclusive Breast Milk or Infant Formula for the first 6 months.',
      schedule: '8 to 12 feedings per 24 hours (every 2-3 hours on demand).',
      tips: [
        'Ensure proper latching position to prevent nipple soreness.',
        'Burp baby halfway through and after every feed.',
        'Vitamin D supplementation (400 IU daily) as recommended by WHO/pediatricians.'
      ]
    },
    checklist: [
      'Responds to loud noises with startled reflex',
      'Briefly tracks moving objects with eyes',
      'Lifts head slightly during supervised tummy time',
      'Brings hands toward mouth'
    ]
  },
  {
    id: 'baby',
    name: 'Baby (3-12m)',
    ageRange: '3 - 12 Months',
    badge: 'Sensory Explorer',
    color: 'from-amber-50 to-orange-100/60 border-amber-200',
    iconName: 'Sparkles',
    tagline: 'Solid food introduction, sitting, babbling & motor milestones',
    keyFocus: ['Solid Weaning (6m+)', 'Pincer Grasp', 'Separation Anxiety', 'Crawling & Standing'],
    articles: [
      {
        title: 'Baby-Led Weaning vs. Purees: A Gentle Guide to First Foods at 6 Months',
        readTime: '7 min read',
        author: 'Nutritionist Ritu Bajaj',
        excerpt: 'Introducing iron-rich foods (mashed avocados, ragi porridge, lentils) safely while avoiding honey & salt under 1 year.',
        tags: ['Weaning', 'Nutrition']
      },
      {
        title: 'Navigating Separation Anxiety & Stranger Fear at 8-10 Months',
        readTime: '5 min read',
        author: 'Dr. Ananya Roy',
        excerpt: 'Why peek-a-boo games build object permanence and lessen bedtime anxiety when parents leave the room.',
        tags: ['Emotional Development']
      }
    ],
    nutrition: {
      summary: 'Transitioning from milk to solid foods at 6 months alongside breastmilk/formula.',
      schedule: '3 soft meal sessions + 4 milk feeds daily.',
      tips: [
        'Single-ingredient food test rule (3-day gap) to monitor potential food allergies.',
        'Offer steamed vegetable sticks (carrots, sweet potatoes) for self-feeding practice.',
        'Avoid cow milk, honey, added salt, and refined sugar before 12 months.'
      ]
    },
    checklist: [
      'Passes toys from one hand to the other',
      'Responds to own name',
      'Sits independently without support',
      'Pulls up to stand holding furniture'
    ]
  },
  {
    id: 'toddler',
    name: 'Toddler (1-3y)',
    ageRange: '1 - 3 Years',
    badge: 'Independent Motion',
    color: 'from-sky-50 to-blue-100/60 border-blue-200',
    iconName: 'Footprints',
    tagline: 'Language explosion, gentle boundaries, potty training & independent play',
    keyFocus: ['Tantrum Regulation', 'Potty Readiness', 'Two-Word Phrases', 'Picky Eating Solutions'],
    articles: [
      {
        title: 'Taming the "Terrible Twos" with Empathy: De-escalation Techniques for Meltdowns',
        readTime: '8 min read',
        author: 'Child Psychologist Dr. Meera Nambiar',
        excerpt: 'Why toddlers melt down (underdeveloped prefrontal cortex) and how "Co-Regulation" stops public tantrums gracefully.',
        tags: ['Tantrums', 'Gentle Parenting']
      },
      {
        title: 'Stress-Free Potty Training: Signs of Readiness & Positive Reinforcement',
        readTime: '6 min read',
        author: 'Dr. Sameer Sen',
        excerpt: 'Moving away from pressure tactics to a child-led 3-day potty routine.',
        tags: ['Potty Training', 'Hygiene']
      }
    ],
    nutrition: {
      summary: '3 balanced meals + 2 nutrient-dense snacks.',
      schedule: 'Family table meals with finger foods, whole cow milk (after 1y), and adequate hydration.',
      tips: [
        'De-emphasize picky eating by serving "safe foods" alongside new vegetables.',
        'Limit fruit juices to under 120ml daily; encourage whole fruits instead.',
        'Include healthy fats (ghee, nut butter spreads, paneer/cheese) for rapid brain development.'
      ]
    },
    checklist: [
      'Says 20+ clear words and connects 2-word phrases ("More milk")',
      'Walks up stairs with rail support',
      'Kicks a ball forward without losing balance',
      'Imitates adult household chores'
    ]
  },
  {
    id: 'preschool',
    name: 'Ages 1-5',
    ageRange: '1 - 5 Years (Preschool)',
    badge: 'Curious Learner',
    color: 'from-rose-50 to-pink-100/60 border-pink-200',
    iconName: 'Palette',
    tagline: 'Social play, vocabulary expansion, curiosity & preschool readiness',
    keyFocus: ['Cooperative Play', 'Imagination & Art', 'Fine Motor Skills', 'Routine Discipline'],
    articles: [
      {
        title: 'Building Emotional Intelligence (EQ) in 3 to 5 Year Olds Through Storytelling',
        readTime: '5 min read',
        author: 'Edu-Consultant Kavita Verma',
        excerpt: 'Name feelings out loud ("I see you are feeling frustrated because the tower fell") to expand emotional vocabulary.',
        tags: ['EQ', 'Preschool']
      },
      {
        title: 'Zero Screen Time Under 2, Strictly 1 Hour for Ages 2-5: AAP Guidelines Explained',
        readTime: '6 min read',
        author: 'Dr. Ananya Roy',
        excerpt: 'How rapid screen flashing impairs attention span and simple alternatives for quiet afternoon downtime.',
        tags: ['Screen Time', 'Health']
      }
    ],
    nutrition: {
      summary: 'Colorful nutrient-rich diet focusing on protein, iron, and calcium.',
      schedule: 'Regular 3-meal structure with active outdoor exercise breaks.',
      tips: [
        'Involve your child in washing vegetables or spreading butter to build food interest.',
        'Keep healthy snacks (roasted makhana, sliced apples, yogurt) readily accessible.',
        'Avoid sugar-sweetened beverages and caffeinated chocolates.'
      ]
    },
    checklist: [
      'Dresses and undresses self with minimal help',
      'Assembles 8-12 piece jigsaw puzzles',
      'Asks "Why?" curiosity questions repeatedly',
      'Takes turns during group play'
    ]
  },
  {
    id: 'school',
    name: 'Ages 5-10',
    ageRange: '5 - 10 Years',
    badge: 'School & Friendships',
    color: 'from-teal-50 to-emerald-100/60 border-emerald-200',
    iconName: 'BookOpen',
    tagline: 'Academic foundation, peer relationships, hobbies & emotional self-control',
    keyFocus: ['Homework Focus', 'Bullying Awareness', 'Digital Hygiene', 'Confidence Building'],
    articles: [
      {
        title: 'Fostering a Growth Mindset: Praise Effort, Not Inherent Intelligence',
        readTime: '7 min read',
        author: 'Prof. S. Ranganathan',
        excerpt: 'Why saying "You worked so hard on this math problem!" creates resilient students who do not give up.',
        tags: ['Education', 'Mindset']
      },
      {
        title: 'Recognizing Peer Exclusion & Relational Bullying in Elementary School',
        readTime: '9 min read',
        author: 'Dr. Sameer Sen',
        excerpt: 'How to empower your child with assertive voice control and building friendships outside the school gate.',
        tags: ['Bullying', 'Resilience']
      }
    ],
    nutrition: {
      summary: 'High energy diet for growing bones, active sports, and cognitive focus.',
      schedule: 'Healthy breakfast before school, balanced tiffin box, afternoon snack, evening dinner.',
      tips: [
        'Pack brain-boosting tiffins: almonds, walnuts, whole-wheat rolls with sprouted beans.',
        'Hydration focus: 1.5 - 2 liters of water daily for physical sports.',
        'Limit processed packaged chips and instant noodles.'
      ]
    },
    checklist: [
      'Reads simple chapter books independently',
      'Understands rules of team games and fair play',
      'Manages basic personal hygiene (brushing, bathing) without reminders',
      'Expresses complex emotions verbally rather than through physical outbursts'
    ]
  },
  {
    id: 'teen',
    name: 'Ages 10-18',
    ageRange: '10 - 18 Years (Teens)',
    badge: 'Puberty & Identity',
    color: 'from-purple-50 to-indigo-100/60 border-purple-200',
    iconName: 'GraduationCap',
    tagline: 'Navigating puberty, emotional identity, exam pressure & open dialogue',
    keyFocus: ['Puberty Education', 'Mental Health Support', 'Cyber Safety & Social Media', 'Academic Balance'],
    articles: [
      {
        title: 'Talking Openly About Body Changes, Hormones & Mental Health in Teenagers',
        readTime: '10 min read',
        author: 'Dr. Ananya Roy',
        excerpt: 'A judgment-free guide to discussing puberty, skin changes, emotional mood swings, and self-worth.',
        tags: ['Puberty', 'Teen Health']
      },
      {
        title: 'Combating Board Exam Burnout & Anxiety in High School Students',
        readTime: '8 min read',
        author: 'Psychiatrist Dr. Archana Rao',
        excerpt: 'Spotting silent signs of clinical anxiety vs normal stress, and protecting sleep schedules during exams.',
        tags: ['Exam Stress', 'Mental Health']
      }
    ],
    nutrition: {
      summary: 'Caloric and mineral boost for puberty growth spurts (Calcium, Iron, Protein).',
      schedule: '3 solid meals with high-protein snacks for active sports and late study hours.',
      tips: [
        'Teen girls require additional iron-rich foods (spinach, jaggery, lentils, lean protein).',
        'Discourage late-night energy drinks and excessive coffee intake during exams.',
        'Promote family dinners to maintain daily open conversation.'
      ]
    },
    checklist: [
      'Demonstrates self-directed study habits and time management',
      'Navigates peer pressure with personal values',
      'Maintains open communication with parents during stressful periods',
      'Understands digital privacy, online boundaries, and social media caution'
    ]
  },
  {
    id: 'youngadult',
    name: '18+ (Young Adult)',
    ageRange: '18+ Years',
    badge: 'Independent Adult',
    color: 'from-amber-50 to-yellow-100/60 border-amber-200',
    iconName: 'HeartHandshake',
    tagline: 'College transition, career mentorship, financial literacy & adult child bonds',
    keyFocus: ['College / Career Guidance', 'Financial Independence', 'Emotional Mentorship', 'Life Skills'],
    articles: [
      {
        title: 'Transitioning from Manager to Mentor: Parenting your 18+ Young Adult Child',
        readTime: '8 min read',
        author: 'Family Counselor Rajesh Sharma',
        excerpt: 'How to step back from giving instructions to offering wise, respectful counsel as your adult child enters university or career.',
        tags: ['Young Adult', 'Parenting Evolution']
      },
      {
        title: 'Essential Financial Literacy Skills Every 18-Year-Old Should Master',
        readTime: '7 min read',
        author: 'Financial Advisor Sunita Kapoor',
        excerpt: 'Budgeting college expenses, understanding debit/credit cards, savings funds, and avoiding debt traps early.',
        tags: ['Finance', 'Life Skills']
      }
    ],
    nutrition: {
      summary: 'Self-sustained healthy cooking habits for hostel life or living independently.',
      schedule: 'Balanced meal prep, avoiding fast food reliance.',
      tips: [
        'Teach 5 basic quick 15-minute homecooked meal recipes before college departure.',
        'Encourage regular physical exercise (gym, running, yoga) to offset sedentary desk/college hours.'
      ]
    },
    checklist: [
      'Manages personal finances and monthly allowance independently',
      'Prepares nutritious basic meals and handles laundry/household responsibilities',
      'Seeks professional mental health support or parental advice when facing adult career decisions',
      'Maintains healthy, mutual respectful bond with parents'
    ]
  }
];
