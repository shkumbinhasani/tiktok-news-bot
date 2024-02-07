import {useEffect, useState} from 'react';
import {AbsoluteFill, staticFile, useCurrentFrame} from 'remotion';
import Parser from 'srt-parser-2';
import {Line} from 'srt-parser-2/src';
import {FRAME_RATE} from './Root';

export const Srt: React.FC<{
	srtFile: string;
}> = ({srtFile}) => {
	const [lines, setLines] = useState<Line[]>([]);
	const currentFrame = useCurrentFrame();

	useEffect(() => {
		(async () => {
			const data = staticFile(srtFile);
			const response = await fetch(data);
			const text = await response.text();
			const parser = new Parser();
			const parsed = parser.fromSrt(text);
			setLines(parsed);
		})();
	}, []);

	return <AbsoluteFill style={{
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		zIndex: 100
	}}>

		{lines.map((line) => {

			const startFrame = Math.floor(line.startSeconds * FRAME_RATE);
			const endFrame = Math.floor(line.endSeconds * FRAME_RATE);
			if (currentFrame >= startFrame && currentFrame <= endFrame) {
				return <span style={{
					fontSize: 70,
					fontWeight: 'bold',
					textShadow: '0 0 10px black',
					textAlign: 'center',
					position: 'absolute',
					top: '50%',
					transform: 'translateY(-50%)',
					maxWidth: '90%',
					fontFamily: 'Impact, sans-serif'
				}}>{line.text}</span>;
			}
			return null;
		})}
	</AbsoluteFill>;
};
