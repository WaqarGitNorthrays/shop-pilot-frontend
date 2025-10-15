import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  itemCount: number;
  link: string;
}

export const CategoryCard = ({ name, icon: Icon, itemCount, link }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <Card className="group p-6 hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer border-0 shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground">{itemCount} items</p>
        </div>
      </Card>
    </Link>
  );
};
