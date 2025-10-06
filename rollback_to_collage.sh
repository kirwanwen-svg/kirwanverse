#!/bin/bash
# 回退到原始拼贴组件的脚本

echo "🔄 回退到原始拼贴组件..."

# 备份当前SlidingGallery
if [ -f "src/components/SlidingGallery.tsx" ]; then
    mv src/components/SlidingGallery.tsx src/components/SlidingGallery_backup.tsx
    echo "✅ SlidingGallery已备份为SlidingGallery_backup.tsx"
fi

# 恢复原始ImageCollage
if [ -f "src/components/ImageCollage_backup.tsx" ]; then
    cp src/components/ImageCollage_backup.tsx src/components/ImageCollage.tsx
    echo "✅ 已恢复ImageCollage组件"
fi

# 更新App.tsx使用原始组件
cat > src/App.tsx << 'EOF'
import ImageCollage from './components/ImageCollage';
import { localFashionItems } from './data/localData';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 图片拼贴区域 - 铺满整个页面 */}
      <div style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
            <ImageCollage images={localFashionItems.map(item => item.imageUrl)} />
      </div>
      
      {/* 标题区域 - 悬空在图片上方 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        textAlign: 'center',
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          lineHeight: '1.2',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          animation: 'fadeInUp 1.5s ease-out 0.5s both'
        }}>
          Kirwanverse
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          opacity: '0.9',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          animation: 'fadeInUp 1.5s ease-out 1s both'
        }}>
          A living archive of fashion muses
        </p>
      </div>
    </div>
  );
}

export default App;
EOF

echo "✅ 已更新App.tsx使用原始组件"
echo "🎉 回退完成！现在使用的是原始的拼贴组件。"
echo "💡 如需恢复滑动组件，请运行: mv src/components/SlidingGallery_backup.tsx src/components/SlidingGallery.tsx"

