import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

const DashboardCard = ({ title, value, icon, trend, color = 'bg-blue-500' }: DashboardCardProps) => {
  // Map colors to our brand palette
  const colorMap: { [key: string]: string } = {
    'bg-blue-500': 'from-[#0397D6] to-blue-600',
    'bg-green-500': 'from-[#63C29D] to-green-600',
    'bg-yellow-500': 'from-yellow-400 to-orange-500',
    'bg-purple-500': 'from-purple-500 to-indigo-600'
  };

  const iconColorMap: { [key: string]: string } = {
    'bg-blue-500': 'text-[#0397D6]',
    'bg-green-500': 'text-[#63C29D]',
    'bg-yellow-500': 'text-yellow-500',
    'bg-purple-500': 'text-purple-500'
  };

  const gradientColor = colorMap[color] || 'from-[#0397D6] to-blue-600';
  const iconColor = iconColorMap[color] || 'text-[#0397D6]';

  return (
    <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      {/* Icon at top */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradientColor} rounded-full flex items-center justify-center shadow-lg`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Title - medium weight */}
      <h3 className="text-gray-700 text-sm font-semibold mb-2">{title}</h3>
      
      {/* Value - larger and bold */}
      <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
      
      {/* Growth rate at bottom */}
      {trend && (
        <div className={`flex items-center space-x-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(trend.value)}% 증가</span>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;