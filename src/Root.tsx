import {Composition, staticFile} from 'remotion';
import {NewsVideo, newsVideoSchema} from './NewsVideo';
import {getAudioDurationInSeconds} from '@remotion/media-utils';

// Each <Composition> is an entry in the sidebar!

export const FRAME_RATE = 30;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="NewsVideo"
				component={NewsVideo}
				fps={FRAME_RATE}
				width={1080}
				height={1920}
				schema={newsVideoSchema}
				defaultProps={{
					title: 'Breaking News',
					srtFile: 'srt.srt',
					images: [
						'https://cdn3.vectorstock.com/i/1000x1000/05/07/1st-number-one-rank-golden-label-design-vector-19610507.jpg',
						'https://numerograph.files.wordpress.com/2020/02/numerology-number-2.jpg?w=600'
					],
					audioFile: 'audio.mp3'
				}}
				calculateMetadata={async ({props}) => {
					const length = await getAudioDurationInSeconds(staticFile(props.audioFile));
					return {
						durationInFrames: Math.floor(length * FRAME_RATE),
					};
				}}
			/>
		</>
	);
};
