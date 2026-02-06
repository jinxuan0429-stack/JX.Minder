'use client';

import { Bricolage_Grotesque, Space_Mono } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const steps = [
  {
    step: 'Step 01',
    title: '核心机制',
    desc: '挑选一个最能让人上头的动作或规则，先把“快乐”定下来。',
    accent: 'from-amber-300/20 via-amber-200/5 to-transparent',
  },
  {
    step: 'Step 02',
    title: '反馈循环',
    desc: '分数、节奏、音效与震动，让玩家每 3 秒都有明确回报。',
    accent: 'from-emerald-300/20 via-emerald-200/5 to-transparent',
  },
  {
    step: 'Step 03',
    title: '难度曲线',
    desc: '把“紧张感”像波浪一样推起来，让人刚好想再试一次。',
    accent: 'from-sky-300/20 via-sky-200/5 to-transparent',
  },
  {
    step: 'Step 04',
    title: '分享仪式',
    desc: '给作品一个发布仪式：名字、简介、海报、开场动画。',
    accent: 'from-rose-300/20 via-rose-200/5 to-transparent',
  },
];

const recipes = [
  {
    title: '弹球实验',
    tag: 'Physics',
    desc: '设计一个 60 秒内就能上瘾的弹球玩法。',
  },
  {
    title: '像素冲刺',
    tag: 'Arcade',
    desc: '用 3 种障碍打造最经典的高分挑战。',
  },
  {
    title: '节奏切片',
    tag: 'Rhythm',
    desc: '把音乐拆成触发点，让手感和节拍对齐。',
  },
  {
    title: '叙事拼图',
    tag: 'Story',
    desc: '用 6 张卡片拼出一个有张力的微型故事。',
  },
];

const aiModules = [
  {
    title: 'AI 机制生成器',
    desc: '输入一句话玩法，AI 输出 3 套可执行的机制组合。',
  },
  {
    title: 'AI 难度调音台',
    desc: '可视化调试难度曲线，自动提示“卡点”。',
  },
  {
    title: 'AI 反馈雕刻师',
    desc: '自动建议音效、特效与动画节奏，让手感更锐利。',
  },
];

const toolkits = [
  { label: '微型引擎', detail: '2D 物理 + 碰撞模板' },
  { label: '像素画板', detail: '16x16 / 32x32 资产生成' },
  { label: '节奏编辑器', detail: '自动切点 + BPM 同步' },
  { label: '关卡草图', detail: '拖拽式关卡布局' },
];

export default function LearnPage() {
  return (
    <main className={`${bricolage.className} relative min-h-screen overflow-hidden bg-[#0b0f12] text-white`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 grid-fade" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px] float-slow" />
        <div className="absolute right-10 top-6 h-64 w-64 rounded-full bg-sky-400/20 blur-[120px] float-mid" />
        <div className="absolute bottom-16 left-1/3 h-80 w-80 rounded-full bg-amber-300/15 blur-[140px] float-slower" />
      </div>

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-12 pt-20 lg:flex-row lg:items-center">
        <div className="flex-1">
          <div className={`${spaceMono.className} text-[11px] uppercase tracking-[0.6em] text-emerald-200/70`}>
            Maker Lab · AI Co-pilot
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            创作工坊
            <span className="block text-white/60">把灵感变成可玩的小游戏。</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            这里不仅展示作品，更提供一套可以让读者参与创作的工具链：从机制设计、节奏调试到发布仪式，
            每一步都能得到 AI 的侧边协作与实时提示。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/content/games"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
            >
              进入小游戏制作
            </a>
            <a
              href="/content"
              className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              查看创作引导
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />模板 12
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-300" />挑战 4
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-300" />共创 128
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="absolute -top-6 right-8 h-24 w-24 rounded-full border border-white/15 shadow-[0_0_40px_rgba(255,255,255,0.15)]" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className={`${spaceMono.className} text-[10px] uppercase tracking-[0.4em] text-white/50`}>
                Creator Console
              </span>
              <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-[11px] text-emerald-200">
                AI 在线
              </span>
            </div>
            <div className="mt-6 grid gap-4">
              {aiModules.map((module) => (
                <div
                  key={module.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-white/25"
                >
                  <div className="text-sm font-semibold text-white/90">{module.title}</div>
                  <p className="mt-2 text-xs leading-relaxed text-white/60">{module.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
              <div className="text-sm font-semibold text-white/90">今日引导</div>
              <p className="mt-2 text-xs text-white/60">尝试用“弹球实验”模板做一个 30 秒内上瘾的玩法。</p>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-300 to-amber-300 shimmer" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.5em] text-white/40`}>
              Build Path
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">小游戏制作路线</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              四步把想法变成作品，每一步都有 AI 插件帮助你快速落地。
            </p>
          </div>
          <div className="flex gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
              AI 辅助创作
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
              可视化引导
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70`} />
              <div className="relative">
                <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.4em] text-white/50`}>
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white/90">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/50">
                <span className="h-1 w-6 rounded-full bg-white/30" />AI 提示卡可用
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-black/20 to-transparent p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.5em] text-white/40`}>
                Game Recipes
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">小游戏制作引导</h2>
              <p className="mt-2 max-w-xl text-sm text-white/60">
                选一个配方开始创作，系统会生成“玩法结构 + 视觉气质 + 关卡提示”。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {toolkits.map((tool) => (
                <div key={tool.label} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <div className="text-[11px] text-white/80">{tool.label}</div>
                  <div className="text-[10px] text-white/50">{tool.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.title}
                className="rounded-3xl border border-white/10 bg-black/40 p-4 transition hover:-translate-y-1 hover:border-white/30"
              >
                <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.4em] text-white/40`}>
                  {recipe.tag}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white/90">{recipe.title}</h3>
                <p className="mt-3 text-xs text-white/60">{recipe.desc}</p>
                <div className="mt-6 h-1 w-full rounded-full bg-white/10">
                  <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-amber-200 to-emerald-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.5em] text-white/40`}>
              Remix Zone
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">读者共创区</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              每周开放一个“共创主题”，读者可以提交自己的关卡、规则或美术风格，
              最终的版本会在游戏展厅公开展示，并记录贡献者姓名。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
                当前主题：轻量解谜
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
                贡献窗口：剩余 5 天
              </span>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="/content/games"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs text-white/80 transition hover:border-white/40"
              >
                提交共创
              </a>
              <a
                href="/content/articles"
                className="rounded-full border border-white/10 bg-transparent px-5 py-2 text-xs text-white/50 transition hover:text-white"
              >
                查看共创故事
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-black/40 p-8">
            <div className={`${spaceMono.className} text-[10px] uppercase tracking-[0.5em] text-white/40`}>
              AI Sidecar
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-white">嵌入式 AI 助手</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              在每个功能里嵌入 AI 侧边助手，读者可以随时调用“提示卡”“灵感扩展”“问题诊断”。
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-sm font-semibold text-white/90">AI 提示卡</div>
                <p className="mt-2 text-xs text-white/60">帮助你识别卡点：机制无聊 / 节奏过慢 / 反馈不足。</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="text-sm font-semibold text-white/90">AI 共创引擎</div>
                <p className="mt-2 text-xs text-white/60">从读者留言里自动生成关卡灵感与改进策略。</p>
              </div>
            </div>
            <div className="mt-6 h-10 rounded-full border border-white/15 bg-white/5 px-4 text-xs text-white/50 flex items-center">
              AI 状态：随时待命 · 轻触即可唤醒
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .grid-fade {
          background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(circle at top, black 20%, transparent 70%);
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
        @keyframes float-mid {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(18px) translateX(-8px);
          }
        }
        @keyframes float-slower {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-24px);
          }
        }
        .float-slow {
          animation: float 10s ease-in-out infinite;
        }
        .float-mid {
          animation: float-mid 14s ease-in-out infinite;
        }
        .float-slower {
          animation: float-slower 16s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-40%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: translateX(-40%);
          animation: shimmer 3.5s linear infinite;
        }
      `}</style>
    </main>
  );
}

