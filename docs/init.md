# VEO WEB UI
在 Gemini API 中使用 Veo 3 生成视频的前端演示页面

## FEATURE:
- 基于参考图，通过 Veo3 的 API 生成视频
- 生成的视频可以预览和下载
- 提供几个示例 demo，包含示例图片，一句话提示词，可以快速生成视频
- 支持vercel部署

## UI Design
参考：`docs/UI_DESIGN_DOCUMENT.md`

## Use Case
- 文生视频：用户输入提示词，点击生成视频，预览视频，下载视频
- 图生视频：用户上传图片，输入提示词，点击生成视频，预览视频，下载视频

## 技术栈
- **框架**：使用 [Next.js](https://nextjs.org/)，支持服务端渲染、文件路由、API Routes 等关键功能。  
- **组件库**：基础组件使用 [Ant Design (antd)](https://ant.design/)，业务组件使用 [lobe-ui](https://github.com/lobehub/lobe-ui)。   
- **样式**：使用 [antd-style](https://github.com/ant-design/antd-style)，CSS-in-JS 方案，与 Ant Design 深度适配。  

## EXAMPLES:
```js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const prompt = `A close up of two people staring at a cryptic drawing on a wall, torchlight flickering.
A man murmurs, 'This must be it. That's the secret code.' The woman looks at him and whispering excitedly, 'What did you find?'`;

let operation = await ai.models.generateVideos({
    model: "veo-3.0-generate-001",
    prompt: prompt,
});

// Poll the operation status until the video is ready.
while (!operation.done) {
    console.log("Waiting for video generation to complete...")
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({
        operation: operation,
    });
}

// Download the generated video.
ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "dialogue_example.mp4",
});
console.log(`Generated video saved to dialogue_example.mp4`);
```
根据图片生成视频
```js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const prompt = "Panning wide shot of a calico kitten sleeping in the sunshine";

// Step 1: Generate an image with Imagen.
const imagenResponse = await ai.models.generateImages({
  model: "imagen-4.0-generate-001",
  prompt: prompt,
});

// Step 2: Generate video with Veo 3 using the image.
let operation = await ai.models.generateVideos({
  model: "veo-3.0-generate-001",
  prompt: prompt,
  image: {
    imageBytes: imagenResponse.generatedImages[0].image.imageBytes,
    mimeType: "image/png",
  },
});

// Poll the operation status until the video is ready.
while (!operation.done) {
  console.log("Waiting for video generation to complete...")
  await new Promise((resolve) => setTimeout(resolve, 10000));
  operation = await ai.operations.getVideosOperation({
    operation: operation,
  });
}

// Download the video.
ai.files.download({
    file: operation.response.generatedVideos[0].video,
    downloadPath: "veo3_with_image_input.mp4",
});
console.log(`Generated video saved to veo3_with_image_input.mp4`);
```

## DOCUMENTATION:
- 在 Gemini API 中使用 Veo 3 生成视频：https://ai.google.dev/gemini-api/docs/video?hl=zh-cn&example=dialogue

## OTHER CONSIDERATIONS:

