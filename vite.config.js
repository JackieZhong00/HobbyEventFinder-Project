import { defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'





export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.API_KEY),
            'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
        plugins: [react()]
    };
});


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
