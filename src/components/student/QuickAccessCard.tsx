import { LucideIcon } from 'lucide-react';

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value?: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  onClick?: () => void;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const QuickAccessCard = ({
  title,
  description,
  icon: Icon,
  value,
  color,
  onClick,
  trend
}: QuickAccessCardProps) => {
  const colorClasses = {
    primary: 'from-[#0397D6] to-blue-600',
    secondary: 'from-[#63C29D] to-green-600', 
    success: 'from-emerald-500 to-green-600',
    warning: 'from-amber-500 to-orange-600'
  };

  const bgColorClasses = {
    primary: 'from-blue-50 to-blue-100',
    secondary: 'from-green-50 to-green-100',
    success: 'from-emerald-50 to-emerald-100', 
    warning: 'from-amber-50 to-amber-100'
  };

  return (
    <div 
      className={`bg-gradient-to-br ${bgColorClasses[color]} rounded-xl p-6 shadow-lg border-2 border-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        {value && (
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        )}
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default QuickAccessCard;