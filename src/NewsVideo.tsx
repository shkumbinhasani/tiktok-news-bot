import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {z} from 'zod';
import {Srt} from './Srt';

export const newsVideoSchema = z.object({
	title: z.string(),
	audioFile: z.string(),
	srtFile: z.string(),
	images: z.array(z.string())
});

export const NewsVideo: React.FC<z.infer<typeof newsVideoSchema>> = ({
	title,
																																				audioFile,
																																				srtFile,
																																				images
																																			}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const imageDuration = videoConfig.durationInFrames / images.length;
	const position = Math.floor(frame / imageDuration);
	const frameWithinImage = frame % imageDuration;
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<span style={{
				position: 'absolute',
				width: 'fit-content',
				textAlign: 'center',
				fontSize: 65,
				fontWeight: 'bold',
				color: 'black',
				zIndex: 100,
				backgroundColor: 'rgba(255, 255, 255, 1)',
				top: 20,
				left: "50%",
				transform: 'translateX(-50%)',
				padding: 20,
				borderRadius: 10,
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
			}}>{title}</span>
			<Audio src={staticFile(audioFile)} />
			<Srt srtFile={srtFile} />
			<Img src={images[position]} style={{
				width: '100%',
				height: '100%',
				objectFit: 'cover',
				position: 'absolute',
				top: 0,
				left: 0,
				transform: `scale(${1 + frameWithinImage / imageDuration})`
			}} />
			<p>{srtFile}</p>
			<pre>{JSON.stringify(images, null, 2)}</pre>
		</AbsoluteFill>
	);
};
