import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from "vite-plugin-compression";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	// 配置需要使用的插件列表
	plugins: [
		vue(),
		viteCompression()
	],
	define: {
		'__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false', // false 减少打包体积
	},
	publicDir: "public", // 默认 public
	resolve: {
		// 配置路径别名
		alias: {
			'@': resolve(__dirname, './src')
		},
	},
	css: {
		// css预处理器
		preprocessorOptions: {
			less: {
				charset: false,
				additionalData: '@import "./src/assets/style/global.less";',
			},
		},
	},
	build: {
		//minify: 'terser',
		chunkSizeWarningLimit: 1500,
		// terserOptions: {
		// 	compress: {
		// 		//生产环境时移除console.log()
		// 		drop_console: true,
		// 		drop_debugger: true,
		// 	},
		// },
		esbuild: {
			drop: ["console", "debugger"],
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	},
	server: {
		// host: '127.0.0.1',
		port: 6688,
		open: true
	}
})
