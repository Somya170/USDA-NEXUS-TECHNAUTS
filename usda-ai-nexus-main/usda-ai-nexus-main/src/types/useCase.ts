export type Stage = 'Idea' | 'Pilot' | 'Production';

export interface UseCase {
  id: string;
  title: string;
  description: string;
  department: string;
  stage: Stage;
  owner: string;
  kpis: string[];
  ethicalConsiderations: string;
  createdAt: string;
  updatedAt: string;
  challenges?: string;
  kpisAchieved?: string[];
}

export const mockUseCases: UseCase[] = [
  {
    id: '1',
    title: 'AI for Crop Prediction',
    description: 'Using machine learning models to predict crop yields based on weather patterns, soil data, and historical farming data.',
    department: 'Farm Production and Conservation',
    stage: 'Production',
    owner: 'Dr. Sarah Johnson',
    kpis: ['95% accuracy', 'Reduced prediction time by 60%', 'Coverage of 500k+ farms'],
    ethicalConsiderations: 'Ensuring data privacy for farmers and avoiding algorithmic bias in predictions.',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-20T14:30:00Z',
    kpisAchieved: ['95% accuracy', 'Reduced prediction time by 60%'],
    challenges: 'Integration with legacy farming systems and ensuring real-time data accuracy.'
  },
  {
    id: '2',
    title: 'Livestock Health Monitoring',
    description: 'IoT-enabled AI system that monitors livestock health metrics in real-time to detect diseases early.',
    department: 'Animal and Plant Health Inspection',
    stage: 'Pilot',
    owner: 'Michael Chen',
    kpis: ['Early disease detection within 24 hours', 'Monitoring 10,000+ livestock', 'Reduce mortality by 30%'],
    ethicalConsiderations: 'Animal welfare standards and data security for farm operations.',
    createdAt: '2024-03-10T09:00:00Z',
    updatedAt: '2024-10-18T11:20:00Z',
    kpisAchieved: ['Early disease detection within 24 hours'],
    challenges: 'Sensor reliability in harsh weather conditions and cost of IoT infrastructure.'
  },
  {
    id: '3',
    title: 'Smart Irrigation System',
    description: 'AI-powered irrigation management system that optimizes water usage based on soil moisture, weather forecasts, and crop requirements.',
    department: 'Natural Resources Conservation',
    stage: 'Production',
    owner: 'Emily Rodriguez',
    kpis: ['30% water savings', 'Coverage of 200+ farms', '98% system uptime'],
    ethicalConsiderations: 'Equitable access to technology for small-scale farmers and water rights considerations.',
    createdAt: '2024-02-05T08:30:00Z',
    updatedAt: '2024-10-22T16:45:00Z',
    kpisAchieved: ['30% water savings', '98% system uptime'],
    challenges: 'Initial investment costs and training farmers on new technology.'
  },
  {
    id: '4',
    title: 'Pest Detection Using Computer Vision',
    description: 'Computer vision models that identify pest infestations in crops using drone imagery and smartphone photos.',
    department: 'Research, Education and Economics',
    stage: 'Pilot',
    owner: 'Dr. James Wilson',
    kpis: ['92% pest identification accuracy', 'Coverage of 50+ crop types', 'Response time under 2 hours'],
    ethicalConsiderations: 'Pesticide use recommendations and environmental impact assessment.',
    createdAt: '2024-04-20T13:15:00Z',
    updatedAt: '2024-10-15T09:30:00Z',
    kpisAchieved: ['92% pest identification accuracy'],
    challenges: 'Training models on diverse pest types and varying environmental conditions.'
  },
  {
    id: '5',
    title: 'Food Supply Chain Optimization',
    description: 'AI system that predicts demand patterns and optimizes food distribution to reduce waste and ensure food security.',
    department: 'Food, Nutrition and Consumer Services',
    stage: 'Idea',
    owner: 'Lisa Martinez',
    kpis: ['Reduce food waste by 25%', 'Improve delivery time by 40%', 'Serve 1M+ households'],
    ethicalConsiderations: 'Fair distribution practices and accessibility for underserved communities.',
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2024-10-25T12:00:00Z',
    challenges: 'Coordinating with multiple stakeholders and integrating diverse data sources.'
  },
  {
    id: '6',
    title: 'Soil Quality Analysis AI',
    description: 'Machine learning platform that analyzes soil samples to provide recommendations for optimal crop selection and fertilization.',
    department: 'Natural Resources Conservation',
    stage: 'Production',
    owner: 'Dr. Robert Anderson',
    kpis: ['90% recommendation accuracy', 'Processing 1000+ samples/day', 'Reduce analysis time by 70%'],
    ethicalConsiderations: 'Soil data ownership and chemical recommendation safety.',
    createdAt: '2024-01-25T11:30:00Z',
    updatedAt: '2024-10-21T15:20:00Z',
    kpisAchieved: ['90% recommendation accuracy', 'Processing 1000+ samples/day'],
    challenges: 'Standardizing soil testing protocols across regions.'
  },
  {
    id: '7',
    title: 'Forest Fire Risk Prediction',
    description: 'AI model that predicts forest fire risk based on weather data, vegetation density, and historical fire patterns.',
    department: 'Forest Service',
    stage: 'Pilot',
    owner: 'Jennifer Lee',
    kpis: ['85% prediction accuracy', 'Coverage of 2M acres', 'Alert time reduced to 30 minutes'],
    ethicalConsiderations: 'Evacuation planning fairness and collaboration with local communities.',
    createdAt: '2024-05-10T14:00:00Z',
    updatedAt: '2024-10-19T10:45:00Z',
    kpisAchieved: ['85% prediction accuracy'],
    challenges: 'Real-time data collection from remote forest areas.'
  },
  {
    id: '8',
    title: 'Automated Greenhouse Management',
    description: 'AI system that controls temperature, humidity, and lighting in greenhouses to optimize plant growth.',
    department: 'Research, Education and Economics',
    stage: 'Production',
    owner: 'David Kim',
    kpis: ['25% yield increase', '40% energy savings', 'Manage 100+ greenhouses'],
    ethicalConsiderations: 'Energy consumption sustainability and worker safety in automated environments.',
    createdAt: '2024-02-15T09:45:00Z',
    updatedAt: '2024-10-23T13:15:00Z',
    kpisAchieved: ['25% yield increase', '40% energy savings'],
    challenges: 'System integration with existing greenhouse infrastructure.'
  },
  {
    id: '9',
    title: 'Nutrient Deficiency Detection',
    description: 'Computer vision system that identifies nutrient deficiencies in plants through leaf image analysis.',
    department: 'Farm Production and Conservation',
    stage: 'Pilot',
    owner: 'Dr. Amanda White',
    kpis: ['88% detection accuracy', 'Coverage of 30+ crop types', 'Mobile app with 5000+ users'],
    ethicalConsiderations: 'Fertilizer recommendation safety and environmental protection.',
    createdAt: '2024-06-05T12:20:00Z',
    updatedAt: '2024-10-17T14:50:00Z',
    kpisAchieved: ['88% detection accuracy'],
    challenges: 'Differentiating between similar symptoms caused by different deficiencies.'
  },
  {
    id: '10',
    title: 'Market Price Prediction Platform',
    description: 'AI platform that predicts agricultural commodity prices to help farmers make informed selling decisions.',
    department: 'Marketing and Regulatory Programs',
    stage: 'Idea',
    owner: 'Thomas Brown',
    kpis: ['75% price trend accuracy', 'Support for 20+ commodities', 'User base of 10,000+ farmers'],
    ethicalConsiderations: 'Market manipulation prevention and equitable access to predictions.',
    createdAt: '2024-08-12T15:30:00Z',
    updatedAt: '2024-10-26T11:30:00Z',
    challenges: 'Accounting for global market volatility and unexpected events.'
  }
];

export const departments = [
  'Farm Production and Conservation',
  'Food, Nutrition and Consumer Services',
  'Natural Resources Conservation',
  'Research, Education and Economics',
  'Animal and Plant Health Inspection',
  'Marketing and Regulatory Programs',
  'Forest Service'
];
