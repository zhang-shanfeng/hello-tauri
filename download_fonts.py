import os
import requests
from pathlib import Path

# 1. 定义基础目录和目标文件夹
base_dir = Path("src/assets/fonts")
base_dir.mkdir(parents=True, exist_ok=True)  # 自动创建目录

# 2. 定义下载任务列表
# 格式: (本地文件名, Google Fonts 远程URL)
tasks = [
    # 字重 400 (Regular)
    ("inter-latin-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"),
    ("inter-latin-ext-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2"),
    ("inter-vietnamese-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2"),
    ("inter-greek-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2"),
    ("inter-greek-ext-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2"),
    ("inter-cyrillic-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2"),
    ("inter-cyrillic-ext-400.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2"),
    
    # 字重 500 (Medium)
    # 注意: 500 的字体文件内容与 400 完全相同(链接一样)，但为了 CSS 兼容性，我们需要下载一份副本并重命名
    ("inter-latin-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"),
    ("inter-latin-ext-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2"),
    ("inter-vietnamese-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2"),
    ("inter-greek-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2"),
    ("inter-greek-ext-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2"),
    ("inter-cyrillic-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2"),
    ("inter-cyrillic-ext-500.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2"),

    # 字重 600 (Semibold)
    # 注意: 600 的字体文件链接在原始文档中指向了 400 的文件，为了保险起见，我们使用 400 的文件作为 600 的回退
    ("inter-latin-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"),
    ("inter-latin-ext-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2"),
    ("inter-vietnamese-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2"),
    ("inter-greek-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2"),
    ("inter-greek-ext-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2"),
    ("inter-cyrillic-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2"),
    ("inter-cyrillic-ext-600.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2"),

    # 字重 700 (Bold)
    # 注意: 700 的字体文件链接在原始文档中也指向了 400 的文件，这里同理
    ("inter-latin-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2"),
    ("inter-latin-ext-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa25L7SUc.woff2"),
    ("inter-vietnamese-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2pL7SUc.woff2"),
    ("inter-greek-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1pL7SUc.woff2"),
    ("inter-greek-ext-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2ZL7SUc.woff2"),
    ("inter-cyrillic-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa0ZL7SUc.woff2"),
    ("inter-cyrillic-ext-700.woff2", "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa2JL7SUc.woff2"),
]

# 3. 执行下载
for filename, url in tasks:
    file_path = base_dir / filename
    if not file_path.exists():
        print(f"📥 正在下载: {filename} ...")
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status() # 检查HTTP错误
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"✅ 成功保存: {file_path}")
        except Exception as e:
            print(f"❌ 下载失败 {filename}: {e}")
    else:
        print(f"⏭️ 跳过 (已存在): {filename}")

print("\n🎉 所有文件处理完毕！")