
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ConversionOptions } from '@/utils/gifConverter';

interface ConversionOptionsProps {
  options: ConversionOptions;
  onChange: (options: ConversionOptions) => void;
}

const ConversionOptionsForm: React.FC<ConversionOptionsProps> = ({ options, onChange }) => {
  const handleFpsChange = (value: number[]) => {
    onChange({ ...options, fps: value[0] });
  };
  
  const handleQualityChange = (value: number[]) => {
    onChange({ ...options, quality: value[0] });
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    
    if (!isNaN(numValue)) {
      onChange({ 
        ...options, 
        [name]: numValue 
      });
    } else if (value === '') {
      onChange({
        ...options,
        [name]: undefined
      });
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium">Conversion Options</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="fps">
            Frame Rate: {options.fps} fps
          </Label>
          <Slider 
            id="fps"
            min={1} 
            max={30} 
            step={1}
            value={[options.fps || 10]} 
            onValueChange={handleFpsChange} 
          />
        </div>

        <div>
          <Label htmlFor="quality">
            Quality: {options.quality} (Lower = Better)
          </Label>
          <Slider 
            id="quality"
            min={1} 
            max={20} 
            step={1}
            value={[options.quality || 10]} 
            onValueChange={handleQualityChange}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              name="width"
              type="number"
              placeholder="Auto"
              value={options.width || ''}
              onChange={handleSizeChange}
            />
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Auto"
              value={options.height || ''}
              onChange={handleSizeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptionsForm;
