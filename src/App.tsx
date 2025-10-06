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
      
      {/* 左上角标识 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 200,
        pointerEvents: 'none'
      }}>
        <h2 style={{
          fontSize: '1.2rem',
          fontWeight: '600',
          color: 'white',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          margin: 0,
          letterSpacing: '0.5px',
          animation: 'fadeInUp 1.5s ease-out 0.3s both'
        }}>
          Kirwanverse
        </h2>
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
