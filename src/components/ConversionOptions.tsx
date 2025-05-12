
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
    <div className="space-y-6 p-6 border border-gray-700 rounded-lg bg-black/30 backdrop-blur-sm">
      <h3 className="text-lg font-medium text-gray-200">Conversion Options</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="fps" className="text-gray-300">
              Frames per second:
            </Label>
            <span className="text-blue-400 font-medium">{options.fps} fps</span>
          </div>
          <Slider 
            id="fps"
            min={1} 
            max={30} 
            step={1}
            value={[options.fps || 10]} 
            onValueChange={handleFpsChange}
            className="cursor-pointer" 
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="quality" className="text-gray-300">
              Quality:
            </Label>
            <span className="text-blue-400 font-medium">{options.quality} (Lower = Better)</span>
          </div>
          <Slider 
            id="quality"
            min={1} 
            max={20} 
            step={1}
            value={[options.quality || 10]} 
            onValueChange={handleQualityChange}
            className="cursor-pointer"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width" className="text-gray-300 mb-1 block">Width</Label>
            <Input
              id="width"
              name="width"
              type="number"
              placeholder="Auto"
              value={options.width || ''}
              onChange={handleSizeChange}
              className="bg-gray-800/50 border-gray-700 text-gray-200"
            />
          </div>
          <div>
            <Label htmlFor="height" className="text-gray-300 mb-1 block">Height</Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Auto"
              value={options.height || ''}
              onChange={handleSizeChange}
              className="bg-gray-800/50 border-gray-700 text-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptionsForm;
