<template>
    <!-- 左右分割 -->
    <div class="flex space-x-4">
        <!-- 2. SVG 电路图区域 -->
        <div class="flex flex-col items-center py-4 dark:bg-white">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 600 350"
                width="100%"
                height="100%"
            >
                <!-- 左侧 Vin 输入端 -->

                <circle cx="50" cy="120" r="4" class="node-circle" />

                <!-- R1 电阻 (锯齿状) -->
                <path
                    d="M 50 120 L 90 120 L 105 90 L 135 150 L 165 90 L 195 150 L 225 90 L 255 150 L 270 120 L 300 120"
                    class="circuit-line"
                />

                <!-- Vout 输出点 -->
                <circle cx="300" cy="120" r="4" class="node-circle" />

                <!-- R2 电阻 (锯齿状) -->
                <path
                    d="M 300 120 L 330 120 L 345 90 L 375 150 L 405 90 L 435 150 L 465 90 L 495 150 L 510 120 L 550 120"
                    class="circuit-line"
                />

                <!-- 右侧回路连线 -->
                <path d="M 550 120 L 550 250 L 50 250" class="circuit-line" />

                <!-- 左下角 Vin 负极 -->
                <line x1="50" y1="210" x2="50" y2="250" class="circuit-line" />
                <circle cx="50" cy="210" r="4" class="node-circle" />

                <!-- GND 接地符号 (位于底部中间) -->
                <g transform="translate(300, 250)">
                    <line x1="0" y1="0" x2="0" y2="15" class="circuit-line" />
                    <line
                        x1="-15"
                        y1="15"
                        x2="15"
                        y2="15"
                        class="circuit-line"
                    />
                    <line
                        x1="-10"
                        y1="22"
                        x2="10"
                        y2="22"
                        class="circuit-line"
                    />
                    <line x1="-5" y1="29" x2="5" y2="29" class="circuit-line" />
                </g>

                <!-- 文本标签 -->
                <text x="150" y="70" class="label-text">R1</text>
                <text x="450" y="70" class="label-text">R2</text>
                <text x="300" y="90" class="label-text">
                    V
                    <tspan dy="5" font-size="0.7em">out</tspan>
                </text>
                <text x="20" y="170" class="label-text">
                    V
                    <tspan dy="5" font-size="0.7em">in</tspan>
                </text>
                <text x="300" y="310" class="label-text">GND</text>
            </svg>
        </div>

        <!-- 3. 公式讲解区域 -->
        <div class="space-y-3 text-sm text-slate-400">
            <h4 class="text-slate-400 dark:text-zinc-400 font-semibold">
                💡 原理与公式推导
            </h4>
            <p>
                在串联电路中，流过各个电阻的电流
                <code class="text-emerald-400 bg-slate-800 px-1 rounded"
                    >I</code
                >
                是相同的。 根据欧姆定律，总电流为：<code
                    class="text-slate-200 bg-slate-800 px-1 rounded"
                    >I = V_in / (R1 + R2)</code
                >
            </p>
            <p>
                输出电压
                <code class="text-emerald-400 bg-slate-800 px-1 rounded"
                    >V_out</code
                >
                即为电阻
                <code class="text-slate-200 bg-slate-800 px-1 rounded">R2</code>
                两端的电压降：
            </p>
            <div
                class="bg-slate-800 border border-slate-700 rounded-md p-3 text-center text-base font-mono text-white tracking-wide"
            >
                V_out = V_in × [ R2 / (R1 + R2) ]
            </div>
            <p class="text-xs">
                * 提示：R2 占总电阻的比例越大，V_out 越接近
                V_in。此电路适用于信号电平转换，但不适合为大功率负载供电。
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.circuit-line {
    stroke: #000;
    stroke-width: 3;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.label-text {
    font-family: sans-serif;
    font-size: 24px;
    fill: #000;
    text-anchor: middle;
}

.node-circle {
    fill: #fff;
    stroke: #000;
    stroke-width: 3;
}
</style>
