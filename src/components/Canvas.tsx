import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  activeTool: string;
  brushColor: string;
  brushSize: number;
  theme: 'light' | 'dark';
}

export function Canvas({ activeTool, brushColor, brushSize, theme }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to match parent
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        contextRef.current = ctx;
        
        // Fill background
        ctx.fillStyle = theme === 'dark' ? '#1a1b26' : '#f8f9fa';
        ctx.fillRect(0, 0, width, height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [theme]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = brushColor;
      contextRef.current.lineWidth = brushSize;
    }
  }, [brushColor, brushSize]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    let offsetX, offsetY;
    if ('touches' in nativeEvent) {
      const rect = (nativeEvent.target as HTMLElement).getBoundingClientRect();
      offsetX = nativeEvent.touches[0].clientX - rect.left;
      offsetY = nativeEvent.touches[0].clientY - rect.top;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    if (!contextRef.current) return;
    
    if (activeTool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current) return;

    let offsetX, offsetY;
    if ('touches' in nativeEvent) {
      const rect = (nativeEvent.target as HTMLElement).getBoundingClientRect();
      offsetX = nativeEvent.touches[0].clientX - rect.left;
      offsetY = nativeEvent.touches[0].clientY - rect.top;
    } else {
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    }

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
      className="w-full h-full touch-none cursor-crosshair"
    />
  );
}
