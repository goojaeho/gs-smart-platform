import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface StudyChartProps {
  type: 'weekly' | 'subject';
  data: any[];
  title: string;
}

const StudyChart = ({ type, data, title }: StudyChartProps) => {
  if (type === 'weekly') {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-white">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
          <span className="w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full"></span>
          <span>{title}</span>
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12, fill: '#666' }}
              stroke="#666"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#666' }}
              stroke="#666"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '2px solid #0397D6',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="korean" fill="#0397D6" name="국어" radius={[2, 2, 0, 0]} />
            <Bar dataKey="english" fill="#63C29D" name="영어" radius={[2, 2, 0, 0]} />
            <Bar dataKey="math" fill="#f97316" name="수학" radius={[2, 2, 0, 0]} />
            <Bar dataKey="science" fill="#a855f7" name="과학" radius={[2, 2, 0, 0]} />
            <Bar dataKey="social" fill="#f59e0b" name="사회" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Subject radar chart
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-white">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <span className="w-4 h-4 bg-gradient-to-r from-secondary to-primary rounded-full"></span>
        <span>{title}</span>
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#f0f0f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fontSize: 10, fill: '#666' }}
          />
          <Radar 
            name="성취도" 
            dataKey="value" 
            stroke="#0397D6" 
            fill="#0397D6" 
            fillOpacity={0.3}
            strokeWidth={3}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '2px solid #0397D6',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudyChart;