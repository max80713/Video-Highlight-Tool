# Video Highlight Tool

This project is a demo video highlight tool, designed to help users create highlight clips from uploaded videos and overlay AI-generated transcripts. The application simulates AI processing to provide transcripts, section titles, and suggested highlights in JSON format.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technical Choices](#technical-choices)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Active URL](#active-url)

## Project Overview
This tool enables users to:
- Upload videos
- View AI-generated transcripts with timestamps and section titles
- Select sentences to create video highlights
- Preview selected highlights with overlaid transcript text
- Synchronize the editing area with the video player for easy navigation

The project supports both desktop and mobile platforms, specifically Windows, Mac, iOS, and Android, using the latest versions of Chrome and Safari.

## Key Features
### 1. Video Upload
Users can upload videos from their devices.

### 2. Mock AI Processing
The tool uses a mock API to simulate AI-based processing. The API returns:
- Full video transcript with timestamps
- Transcripts divided into sections
- Section titles and suggested highlight sentences

### 3. Split Screen Layout
- **Left Side**: Editing area where users can interact with the transcript, select sentences, and navigate through the video.
- **Right Side**: Preview area showing the selected video highlights with overlaid transcript.

### 4. Synchronization
- Clicking a timestamp in the transcript navigates the video to that time.
- During playback, the editing area auto-scrolls to the corresponding sentence.
- Selecting/unselecting sentences updates the preview dynamically.

### 5. Transcript Overlay
Selected sentences appear as an overlay on the video with proper timing to match the audio.

## Technical Choices

1. **React**: The project is built using React 18 for its modern hooks-based approach and strong community support.
   
2. **Zustand**: For state management, I use Zustand, a lightweight state management library. It offers simplicity and efficiency compared to more complex alternatives, making it a perfect fit for handling the application’s UI state, especially for managing the video editing interactions and syncing the transcript with the video.

3. **Immer**: Immer is used to handle immutable state updates more conveniently in JavaScript. It allows for simpler, more readable logic when managing and updating the state, especially for deeply nested structures like video transcript data.

4. **Tailwind CSS**: Tailwind CSS is utilized for styling, enabling a utility-first CSS approach. It ensures rapid, consistent, and responsive UI development with minimal custom CSS.

5. **Prettier + ESLint**: Prettier is used for code formatting, ensuring consistent styling, while ESLint helps with code quality and enforcing best practices. Additionally, the `prettier-plugin-tailwindcss` plugin ensures that Tailwind classes are automatically sorted.

6. **Vite**: The project is bundled with Vite, a modern frontend build tool that offers fast development server start times, making the development process smoother and more efficient.

7. **React Icons**: For visual enhancements, I use React Icons, which provides a wide range of scalable vector icons.

## Installation
### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/video-highlight-tool.git
   cd video-highlight-tool
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be running at `http://localhost:5173`.

## Usage
1. Upload a video file from your local device.
2. The AI processing simulation will provide a full transcript and suggested highlights.
3. Select sentences from the transcript to create a highlight reel.
4. The preview area will show the final clip with overlaid transcript text.

## Active URL
Access the live demo at [https://video-highlight-tool.web.app/](https://video-highlight-tool.web.app/)
