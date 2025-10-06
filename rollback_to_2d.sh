#!/bin/bash

# 撤回脚本：从4D滑动回滚到2D滑动
echo "正在撤回4D滑动功能，恢复到2D滑动..."

# 恢复备份的ImageCollage组件
cp /Users/kirwan/Desktop/coding/src/components/ImageCollage_4d_backup.tsx /Users/kirwan/Desktop/coding/src/components/ImageCollage.tsx

echo "✅ 已成功撤回4D滑动功能，恢复到2D滑动"
echo "现在可以重新启动开发服务器：npm run dev"

