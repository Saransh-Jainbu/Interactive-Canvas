import React, { useRef, useEffect, useState, useCallback } from 'react';

interface InfiniteCanvasProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
  brushSettings: {
    color: string;
    size: number;
    opacity: number;
  };
  backgroundConfig: {
    color: string;
    pattern: 'none' | 'grid' | 'dots';
    patternOpacity: number;
  };
  zoom: number;
  setZoom: (zoom: number) => void;
  pan: { x: number; y: number };
  setPan: (pan: { x: number; y: number } | ((p: {x:number, y:number}) => {x:number, y:number})) => void;
  theme: 'light' | 'dark';
  paths: any[];
  setPaths: (paths: any[] | ((p: any[]) => any[])) => void;
  setRedoStack: (stack: any[]) => void;
}

export function InfiniteCanvas({ 
  activeTool, 
  setActiveTool,
  brushSettings, 
  backgroundConfig,
  zoom, 
  setZoom, 
  pan, 
  setPan, 
  theme,
  paths,
  setPaths,
  setRedoStack
}: InfiniteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const currentPath = useRef<{ points: {x: number, y: number}[], color: string, size: number, opacity: number, tool: string } | null>(null);

  // Redraw the entire canvas when paths or view changes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(zoom * dpr, 0, 0, zoom * dpr, pan.x * dpr, pan.y * dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const drawPath = (path: any) => {
      if (path.points.length < 1) return;
      
      ctx.beginPath();
      
      if (path.tool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'white';
        ctx.globalAlpha = 1.0;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = path.color;
        ctx.globalAlpha = path.opacity;
      }
      
      ctx.lineWidth = path.size;

      if (['rectangle', 'circle', 'triangle', 'arrow', 'line'].includes(path.tool)) {
        const start = path.points[0];
        const end = path.points[1];
        if (!end) return;

        if (path.tool === 'rectangle') {
          ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
        } else if (path.tool === 'circle') {
          const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (path.tool === 'triangle') {
          ctx.moveTo(start.x + (end.x - start.x) / 2, start.y);
          ctx.lineTo(start.x, end.y);
          ctx.lineTo(end.x, end.y);
          ctx.closePath();
          ctx.stroke();
        } else if (path.tool === 'line') {
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
        } else if (path.tool === 'arrow') {
          const headlen = 10;
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.lineTo(end.x - headlen * Math.cos(angle - Math.PI / 6), end.y - headlen * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(end.x - headlen * Math.cos(angle + Math.PI / 6), end.y - headlen * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
        }
      } else {
        // Freeform drawing
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
      }
    };

    // Draw existing paths
    paths.forEach(drawPath);

    // Draw active path (preview)
    if (currentPath.current) {
      drawPath(currentPath.current);
    }
  }, [paths, zoom, pan]);

  useEffect(() => {
    redraw();
  }, [redraw, theme]);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const parent = containerRef.current;
      if (!parent || !canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      contextRef.current = ctx;
      redraw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [redraw]);

  const getCanvasPoint = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Standard coordinate mapping:
    // 1. Subtract element offset to get local coordinates
    // 2. Subtract pan and divide by zoom to get world coordinates
    return {
      x: (clientX - rect.left - pan.x) / zoom,
      y: (clientY - rect.top - pan.y) / zoom
    };
  };

  const getBackgroundClass = () => {
    if (backgroundConfig.pattern === 'none') return '';
    if (backgroundConfig.pattern === 'grid') return theme === 'dark' ? 'bg-grid-pattern-dark' : 'bg-grid-pattern';
    if (backgroundConfig.pattern === 'dots') return theme === 'dark' ? 'bg-dots-pattern-dark' : 'bg-dots-pattern';
    return '';
  };

  const startInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool === 'select' || (e as any).button === 1 || (e as any).spaceKey) {
      setIsPanning(true);
      lastPanPoint.current = { 
        x: 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientX : (e as any).clientX,
        y: 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientY : (e as any).clientY
      };
      return;
    }

    const { x, y } = getCanvasPoint(e.nativeEvent);
    setStartPoint({ x, y });
    const ctx = contextRef.current;
    if (!ctx) return;

    // Start a new path tracking
    currentPath.current = {
      points: [{ x, y }],
      color: brushSettings.color,
      size: brushSettings.size,
      opacity: brushSettings.opacity,
      tool: activeTool
    };

    setIsDrawing(true);
  };

  const moveInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientX : (e as any).clientX;
    const clientY = 'touches' in e.nativeEvent ? e.nativeEvent.touches[0].clientY : (e as any).clientY;

    setMousePos({ x: clientX, y: clientY });

    if (isPanning) {
      const dx = clientX - lastPanPoint.current.x;
      const dy = clientY - lastPanPoint.current.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPanPoint.current = { x: clientX, y: clientY };
      return;
    }

    if (!isDrawing || !currentPath.current) return;

    const { x, y } = getCanvasPoint(e.nativeEvent);
    
    // For shapes, we only need start and current end point
    if (['rectangle', 'circle', 'triangle', 'arrow', 'line'].includes(activeTool)) {
      currentPath.current.points = [startPoint, { x, y }];
      redraw(); // Shapes need a full redraw to clear the previous "preview" line
    } else {
      currentPath.current.points.push({ x, y });
      
      // Pencil/Eraser: Incremental draw for performance
      const ctx = contextRef.current;
      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        ctx.save();
        ctx.setTransform(zoom * dpr, 0, 0, zoom * dpr, pan.x * dpr, pan.y * dpr);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSettings.size;
        
        if (activeTool === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'white';
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = brushSettings.color;
          ctx.globalAlpha = brushSettings.opacity;
        }

        const pts = currentPath.current.points;
        if (pts.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  };

  const endInteraction = () => {
    if (isDrawing && currentPath.current) {
      const finalPath = currentPath.current;
      setPaths(prev => [...prev, finalPath]);
      setRedoStack([]); // Clear redo stack on new action
      
      // Auto-switch back to pencil after drawing a shape to avoid clutter/accidental draws
      if (['rectangle', 'circle', 'triangle', 'arrow', 'line'].includes(activeTool)) {
        setActiveTool('pencil');
      }
    }
    currentPath.current = null;
    setIsDrawing(false);
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      const delta = -e.deltaY;
      const factor = Math.pow(1.1, delta / 100);
      const newZoom = Math.min(Math.max(0.1, zoom * factor), 10);
      
      // Zoom relative to mouse position
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const dx = (mouseX - pan.x) / zoom;
        const dy = (mouseY - pan.y) / zoom;
        
        setPan({
          x: mouseX - dx * newZoom,
          y: mouseY - dy * newZoom
        });
      }
      setZoom(newZoom);
    } else {
      setPan(prev => ({ x: prev.x - e.deltaX, y: prev.y - e.deltaY }));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative touch-none select-none overflow-hidden transition-colors duration-500"
      style={{ 
        cursor: activeTool === 'select' ? 'grab' : 'none',
        backgroundColor: backgroundConfig.color,
      }}
      onWheel={handleWheel}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {/* Pattern Layer - Panned and Zoomed */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${getBackgroundClass()}`}
        style={{ 
          opacity: backgroundConfig.patternOpacity,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
          backgroundSize: backgroundConfig.pattern === 'grid' 
            ? `${40 * zoom}px ${40 * zoom}px` 
            : `${24 * zoom}px ${24 * zoom}px`
        }}
      />

      <canvas
        ref={canvasRef}
        onMouseDown={startInteraction}
        onMouseMove={moveInteraction}
        onMouseUp={endInteraction}
        onMouseLeave={endInteraction}
        onTouchStart={startInteraction}
        onTouchMove={moveInteraction}
        onTouchEnd={endInteraction}
        className="absolute inset-0 w-full h-full"
      />

      {/* Custom Circular Cursor for Drawing/Erasing Tools */}
      {isMouseOver && activeTool !== 'select' && (
        <div 
          className="fixed pointer-events-none z-[100] rounded-full border border-gray-400/50 flex items-center justify-center bg-white/10 backdrop-blur-[1px]"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            width: brushSettings.size * zoom,
            height: brushSettings.size * zoom,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Central dot for precision */}
          <div className="w-1 h-1 bg-gray-400 rounded-full" />
        </div>
      )}
    </div>
  );
}
