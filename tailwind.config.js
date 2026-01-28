/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 扫描 app 文件夹
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // 以防万一你用了 pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 扫描组件
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 如果有 src 文件夹
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}