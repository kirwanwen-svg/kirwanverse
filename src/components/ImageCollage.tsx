import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ImageCollageProps {
  images: string[];
}

const ImageCollage: React.FC<ImageCollageProps> = ({ images }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseDirection, setMouseDirection] = useState({ x: 0.1, y: 0.1 }); // 鼠标移动方向（初始值）
  const [targetDirection, setTargetDirection] = useState({ x: 0.1, y: 0.1 }); // 目标方向（初始值）
  const [mouseTrail, setMouseTrail] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // 预览图片
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // 预览状态
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastMouseTime = useRef(0);
  const lastMousePosition = useRef({ x: 0, y: 0 }); // 记录上次鼠标位置
  const autoRefreshRef = useRef<number | null>(null); // 自动刷新定时器
  const mouseMoveTimeout = useRef<number | null>(null); // 鼠标移动防抖
  const imagesRef = useRef<string[]>([]); // 存储images数组的引用

  // 更新images引用
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // 随机选择50张图片（再增加10张）
  useEffect(() => {
    if (images.length > 0) {
      const shuffled = [...images].sort(() => Math.random() - 0.5);
      setSelectedImages(shuffled.slice(0, 50));
    }
  }, [images]);

  // 每20秒自动刷新图片 - 完全独立于鼠标事件
  useEffect(() => {
    if (imagesRef.current.length > 0) {
      // 清除之前的定时器
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }

      // 设置新的定时器 - 使用稳定的引用避免重新创建
      const refreshImages = () => {
        const shuffled = [...imagesRef.current].sort(() => Math.random() - 0.5);
        setSelectedImages(shuffled.slice(0, 50));
      };

      autoRefreshRef.current = setInterval(refreshImages, 20000);

      return () => {
        if (autoRefreshRef.current) {
          clearInterval(autoRefreshRef.current);
          autoRefreshRef.current = null;
        }
      };
    }
  }, []); // 空依赖数组，确保只运行一次，完全独立于其他状态

  // 独立的鼠标方向更新 - 使用requestAnimationFrame避免卡顿
  useEffect(() => {
    let animationId: number;
    
    const updateDirection = () => {
      setMouseDirection(prev => {
        // 使用高级缓动函数让方向变化更丝滑
        const easeFactor = 0.85; // 提高缓动系数，更丝滑的响应
        
        // 使用cubic-bezier缓动，更自然的过渡
        const smoothX = prev.x + (targetDirection.x - prev.x) * easeFactor;
        const smoothY = prev.y + (targetDirection.y - prev.y) * easeFactor;
        
        // 添加微小的惯性效果，让方向切换更自然
        const inertiaFactor = 0.95;
        return {
          x: smoothX * inertiaFactor, // 丝滑的响应速度
          y: smoothY * inertiaFactor  // 丝滑的响应速度
        };
      });
      
      animationId = requestAnimationFrame(updateDirection);
    };
    
    animationId = requestAnimationFrame(updateDirection);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []); // 移除targetDirection依赖，避免无限循环

  // 四周无限循环滑动动画
  useEffect(() => {
    const animate = () => {
      if (!isPaused) {
        setScrollPosition(prev => {
          const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
          const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
          
          // 基础滑动速度
          const baseSpeed = 0.8;
          
          // 平滑更新鼠标方向（丝滑响应）- 移到动画循环外部
          
          // 计算鼠标移动强度
          const mouseIntensity = Math.sqrt(mouseDirection.x * mouseDirection.x + mouseDirection.y * mouseDirection.y);
          
          // 根据鼠标方向控制滑动方向和速度
          let speedX = baseSpeed;
          let speedY = baseSpeed;
          
          // 统一速度控制 - 取消加速度效果，保持方向控制
          if (mouseIntensity > 0.01) {
            // 鼠标干预时保持基础速度，只改变方向
            const directionMultiplier = 0.8; // 方向控制倍数，保持基础速度
            
            // 根据鼠标方向调整滑动方向
            // 鼠标向右移动，图片向右滑动（speedX为正）
            // 鼠标向左移动，图片向左滑动（speedX为负）
            // 鼠标向下移动，图片向下滑动（speedY为正）
            // 鼠标向上移动，图片向上滑动（speedY为负）
            
            // 使用方向控制，保持基础速度
            speedX = baseSpeed + mouseDirection.x * directionMultiplier;
            speedY = baseSpeed + mouseDirection.y * directionMultiplier;
            
            // 限制速度在基础速度范围内
            const maxSpeed = baseSpeed * 1.5; // 限制最大速度为基础速度的1.5倍
            speedX = Math.min(Math.max(speedX, -maxSpeed), maxSpeed);
            speedY = Math.min(Math.max(speedY, -maxSpeed), maxSpeed);
          } else {
            // 无鼠标干预时，使用基础速度
            speedX = baseSpeed;
            speedY = baseSpeed;
          }
          
          // 计算新的位置
          let newX = prev.x + speedX;
          let newY = prev.y + speedY;
          
          // 四周无限循环逻辑
          if (newX >= viewportWidth) {
            newX = 0;
          } else if (newX < 0) {
            newX = viewportWidth;
          }
          
          if (newY >= viewportHeight) {
            newY = 0;
          } else if (newY < 0) {
            newY = viewportHeight;
          }
          
          return { x: newX, y: newY };
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // 优化的鼠标移动检测和跟随 - 立即响应
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const now = Date.now();
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 计算鼠标移动方向
    const deltaX = mouseX - lastMousePosition.current.x;
    const deltaY = mouseY - lastMousePosition.current.y;
    
    // 使用requestAnimationFrame防抖，更高效的更新
    if (mouseMoveTimeout.current) {
      cancelAnimationFrame(mouseMoveTimeout.current);
    }
    
    mouseMoveTimeout.current = requestAnimationFrame(() => {
      // 立即更新目标方向（优化敏感度，减少卡顿）
      setTargetDirection({
        x: deltaX * 0.4, // 优化敏感度，减少卡顿
        y: deltaY * 0.4  // 优化敏感度，减少卡顿
      });
    }); // 使用requestAnimationFrame，约60fps
    
    // 更新鼠标位置
    setMousePosition({ x: mouseX, y: mouseY });
    
    // 记录当前鼠标位置
    lastMousePosition.current = { x: mouseX, y: mouseY };
    
    // 添加鼠标轨迹特效（提高频率，更流畅）
    if (now - lastMouseTime.current > 16) { // 60fps的轨迹更新，更流畅
      const newTrail = {
        id: now,
        x: mouseX,
        y: mouseY,
        opacity: 1
      };
      
      setMouseTrail(prev => {
        const updated = [...prev.slice(-10), newTrail]; // 增加到10个点，更丰富的轨迹
        return updated;
      });
      
      // 2秒后移除轨迹点，更快清理
      setTimeout(() => {
        setMouseTrail(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 2000);
      
      lastMouseTime.current = now;
    }
    
    // 检测鼠标是否在图片上
    let isOverImage = false;
    
    // 检查是否在图片区域内
    const positions = [
      { x: 2, y: 5, width: 25, height: 30 },
      { x: 18, y: 20, width: 20, height: 28 },
      { x: 32, y: 2, width: 18, height: 25 },
      { x: 48, y: 12, width: 28, height: 22 },
      { x: 22, y: 35, width: 22, height: 18 },
      { x: 58, y: 5, width: 19, height: 23 },
      { x: 8, y: 45, width: 24, height: 15 },
      { x: 42, y: 30, width: 18, height: 25 },
      { x: 68, y: 20, width: 20, height: 20 },
      { x: 28, y: 55, width: 16, height: 22 },
      // 新增10张图片位置
      { x: 75, y: 5, width: 15, height: 20 },
      { x: 85, y: 30, width: 12, height: 18 },
      { x: 5, y: 75, width: 16, height: 15 },
      { x: 25, y: 80, width: 14, height: 12 },
      { x: 45, y: 70, width: 18, height: 20 },
      { x: 65, y: 50, width: 15, height: 16 },
      { x: 80, y: 60, width: 17, height: 14 },
      { x: 15, y: 35, width: 13, height: 22 },
      { x: 55, y: 45, width: 16, height: 19 },
      { x: 35, y: 85, width: 14, height: 13 }
    ];
    
    // 使用更高效的检测算法
    const checkImageCollision = (pos: any) => {
      const itemX = (pos.x / 100) * rect.width - scrollPosition.x;
      const itemY = (pos.y / 100) * rect.height - scrollPosition.y;
      const itemWidth = (pos.width / 100) * rect.width;
      const itemHeight = (pos.height / 100) * rect.height;
      
      return mouseX >= itemX && mouseX <= itemX + itemWidth &&
             mouseY >= itemY && mouseY <= itemY + itemHeight;
    };
    
    // 使用some()方法，找到第一个匹配就停止，提高性能
    isOverImage = positions.some(pos => checkImageCollision(pos));
    
    setIsPaused(isOverImage);
  }, [scrollPosition]);

  // 处理图片点击预览
  const handleImageClick = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    setIsPreviewOpen(true);
  };

  // 关闭预览
  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage(null);
  };

  // 下载图片
  const downloadImage = async (imageSrc: string) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fashion-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('下载失败:', error);
    }
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewOpen) {
        closePreview();
      }
    };

    if (isPreviewOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isPreviewOpen]);

  // 组件卸载时清理所有定时器
  useEffect(() => {
    return () => {
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }
    };
  }, []);

  // 创建拼贴布局 - 增加更多图片
  const createCollageLayout = () => {
    return selectedImages.map((src, index) => {
      // 50张图片的四周循环布局 - 均匀分布
      const positions = [
        // 前10张图片 - 左上区域
        { x: 1, y: 3, width: 26, height: 32, rotation: -2 },
        { x: 16, y: 18, width: 22, height: 30, rotation: 1 },
        { x: 30, y: 1, width: 20, height: 27, rotation: -1 },
        { x: 46, y: 10, width: 30, height: 24, rotation: 2 },
        { x: 20, y: 33, width: 24, height: 20, rotation: -1.5 },
        { x: 56, y: 3, width: 21, height: 25, rotation: 1.5 },
        { x: 6, y: 43, width: 26, height: 17, rotation: 0.5 },
        { x: 40, y: 28, width: 20, height: 27, rotation: -0.5 },
        { x: 66, y: 18, width: 22, height: 22, rotation: 1 },
        { x: 26, y: 53, width: 18, height: 24, rotation: -1 },
        // 新增10张图片 - 填充空白区域，更紧凑
        { x: 73, y: 3, width: 17, height: 22, rotation: 1.5 },
        { x: 83, y: 28, width: 14, height: 20, rotation: -1 },
        { x: 3, y: 73, width: 18, height: 17, rotation: 0.8 },
        { x: 23, y: 78, width: 16, height: 14, rotation: -0.8 },
        { x: 43, y: 68, width: 20, height: 22, rotation: 1.2 },
        { x: 63, y: 48, width: 17, height: 18, rotation: -1.2 },
        { x: 78, y: 58, width: 19, height: 16, rotation: 0.6 },
        { x: 13, y: 33, width: 15, height: 24, rotation: -0.6 },
        { x: 53, y: 43, width: 18, height: 21, rotation: 0.9 },
        { x: 33, y: 83, width: 16, height: 15, rotation: -0.9 },
        // 再新增10张图片 - 进一步填充空白区域
        { x: 88, y: 8, width: 10, height: 17, rotation: 0.3 },
        { x: 93, y: 38, width: 7, height: 14, rotation: -0.3 },
        { x: 6, y: 88, width: 14, height: 12, rotation: 0.7 },
        { x: 20, y: 93, width: 12, height: 10, rotation: -0.7 },
        { x: 38, y: 88, width: 16, height: 11, rotation: 1.1 },
        { x: 58, y: 83, width: 13, height: 15, rotation: -1.1 },
        { x: 83, y: 73, width: 15, height: 13, rotation: 0.4 },
        { x: 10, y: 43, width: 11, height: 20, rotation: -0.4 },
        { x: 48, y: 53, width: 14, height: 17, rotation: 0.8 },
        { x: 28, y: 93, width: 12, height: 7, rotation: -0.8 },
        // 最后10张图片 - 完全填充空白，更紧凑
        { x: 68, y: 13, width: 14, height: 18, rotation: 0.2 },
        { x: 86, y: 23, width: 12, height: 16, rotation: -0.2 },
        { x: 1, y: 63, width: 16, height: 14, rotation: 0.5 },
        { x: 16, y: 68, width: 13, height: 12, rotation: -0.5 },
        { x: 36, y: 58, width: 18, height: 20, rotation: 0.8 },
        { x: 56, y: 63, width: 15, height: 17, rotation: -0.8 },
        { x: 76, y: 53, width: 17, height: 14, rotation: 0.3 },
        { x: 6, y: 23, width: 12, height: 22, rotation: -0.3 },
        { x: 46, y: 33, width: 16, height: 19, rotation: 0.6 },
        { x: 26, y: 73, width: 14, height: 10, rotation: -0.6 },
        // 新增10张图片 - 进一步减少空白区域
        { x: 4, y: 8, width: 12, height: 16, rotation: 0.4 },
        { x: 12, y: 8, width: 10, height: 14, rotation: -0.4 },
        { x: 8, y: 28, width: 14, height: 12, rotation: 0.6 },
        { x: 18, y: 28, width: 12, height: 10, rotation: -0.6 },
        { x: 32, y: 8, width: 16, height: 18, rotation: 0.2 },
        { x: 40, y: 8, width: 14, height: 16, rotation: -0.2 },
        { x: 52, y: 8, width: 12, height: 14, rotation: 0.8 },
        { x: 60, y: 8, width: 10, height: 12, rotation: -0.8 },
        { x: 72, y: 8, width: 18, height: 20, rotation: 0.3 },
        { x: 80, y: 8, width: 16, height: 18, rotation: -0.3 },
        // 四周循环专用图片 - 确保无缝循环
        { x: 1, y: 1, width: 15, height: 20, rotation: 0.5 },
        { x: 90, y: 1, width: 10, height: 15, rotation: -0.5 },
        { x: 1, y: 90, width: 12, height: 10, rotation: 0.3 },
        { x: 90, y: 90, width: 10, height: 10, rotation: -0.3 },
        { x: 50, y: 1, width: 20, height: 25, rotation: 1.2 },
        { x: 50, y: 90, width: 18, height: 10, rotation: -1.2 },
        { x: 1, y: 50, width: 15, height: 18, rotation: 0.8 },
        { x: 90, y: 50, width: 10, height: 15, rotation: -0.8 }
      ];

      const pos = positions[index] || { x: 0, y: 0, width: 15, height: 20, rotation: 0 };

      return {
        src,
        ...pos,
        zIndex: index + 1
      };
    });
  };

  const collageItems = createCollageLayout();

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsPaused(false);
        setMouseTrail([]); // Clear trail on leave
        setMousePosition({ x: 0, y: 0 }); // Reset mouse position
        setMouseDirection({ x: 0, y: 0 }); // Reset direction to default
        setTargetDirection({ x: 0, y: 0 }); // Reset target direction
      }}
    >
      {/* 滑动容器 - 支持X和Y方向滑动 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '200%',
          height: '200%',
          transform: `translate(${-scrollPosition.x}px, ${-scrollPosition.y}px)`,
          willChange: 'transform'
        }}
      >
        {collageItems.map((item, index) => (
          <div
            key={index}
            className="image-hover-instant"
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `rotate(${item.rotation}deg)`,
              zIndex: item.zIndex,
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'visible',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              background: 'transparent',
              border: 'none',
              display: 'inline-block',
              width: 'fit-content',
              height: 'fit-content'
            }}
            onMouseEnter={(e) => {
              // 立即生效，无延迟 - 使用最高效的方式
              const target = e.currentTarget;
              
              // 立即提升到最顶层，无延迟
              target.style.zIndex = '999';
              
              // 大幅缩放，更明显的反馈，使用3D变换
              const scaleFactor = item.width > 20 ? 1.25 : 1.18;
              target.style.transform = `rotate(${item.rotation}deg) scale3d(${scaleFactor}, ${scaleFactor}, 1) translate3d(0, 0, 0)`;
              
              // 增强阴影效果
              target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.8)';
              
              // 完全无过渡，即时响应
              target.style.transition = 'none';
              target.style.animation = 'none';
              
              // 优化性能
              target.style.willChange = 'transform, z-index, box-shadow';
              target.style.transformStyle = 'preserve-3d';
              
              // 强制重绘，确保立即生效
              target.offsetHeight;
            }}
              onMouseLeave={(e) => {
                // 恢复原始状态，使用3D变换
                const target = e.currentTarget;
                
                // 恢复原始状态
                target.style.transform = `rotate(${item.rotation}deg) scale3d(1, 1, 1) translate3d(0, 0, 0)`;
                target.style.zIndex = item.zIndex.toString();
                target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                
                // 丝滑恢复过渡 - 使用更高级的缓动函数
                target.style.transition = 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                target.style.animation = 'none';
                
                // 优化性能
                target.style.willChange = 'transform, box-shadow, z-index';
                target.style.transformStyle = 'preserve-3d';
              }}
              onClick={() => handleImageClick(item.src)}
          >
            <img
              src={item.src}
              alt={`Fashion ${index + 1}`}
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '300px',
                maxHeight: '400px',
                objectFit: 'contain',
                borderRadius: '8px',
                display: 'block',
                background: 'transparent'
              }}
            />
          </div>
        ))}
      </div>
      
      {/* 鼠标轨迹特效 */}
      {mouseTrail.map((trail, index) => (
        <div
          key={trail.id}
          style={{
            position: 'absolute',
            left: trail.x - 2,
            top: trail.y - 2,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${trail.opacity * (0.3 - index * 0.03)})`,
            pointerEvents: 'none',
            zIndex: 50,
            animation: 'trailFade 3s ease-out forwards'
          }}
        />
      ))}
      
      {/* 鼠标光标特效 */}
      <div
        style={{
          position: 'absolute',
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          pointerEvents: 'none',
          zIndex: 60,
          transition: 'all 0.1s ease-out',
          transform: isPaused ? 'scale(1.5)' : 'scale(1)',
          opacity: isPaused ? 0.8 : 0.4
        }}
      />
      
      
      {/* 图片预览模态框 */}
      {isPreviewOpen && previewImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={closePreview}
        >
          {/* 预览图片容器 */}
          <div
            style={{
              position: 'relative',
              maxWidth: '70vw',
              maxHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closePreview}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
              }}
            >
              ×
            </button>
            
            {/* 预览图片 */}
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '600px',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            />
            
            {/* 下载按钮 */}
            <button
              onClick={() => downloadImage(previewImage)}
              style={{
                position: 'absolute',
                bottom: '-60px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '25px',
                padding: '12px 24px',
                color: '#333',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                zIndex: 10000,
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCollage;