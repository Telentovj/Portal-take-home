import { GetTagHashColour } from "@portal/components/annotations/utils/annotation";

interface Detection {
    annotationID: string;
    bound: [number[], number[], number[], number[]];
    boundType: string;
    confidence: number;
    tag: { id: number; name: string };
}

interface TimeStamp {
    fps: number;
    frames: Record<string, Detection[]>;
}

export const getImageTagCounts = (detections: Detection[], confidence: number): Record<string, number> => {
    const tagCounts: Record<string, number> = {};

    detections.forEach((detection: Detection) => {
        if (detection.confidence > confidence) {
            const tagName = detection.tag.name;
            if (tagCounts[tagName]) {
                tagCounts[tagName]++;
            } else {
                tagCounts[tagName] = 1;
            }
        }
    });

    return tagCounts;
}

export const getImageTagColours = (detections: Detection[], confidence: number): Record<string, string> => {
    const tagColours: Record<string, string> = {};

    detections.forEach((detection: Detection) => {
        if (detection.confidence > confidence) {
            const tagID = detection.tag.id;
            if (!(detection.tag.name in tagColours)) {
                const tagColor = GetTagHashColour(tagID);
                tagColours[detection.tag.name] = tagColor;
            }
        }
    });

    return tagColours;
}

export const getVideoTagCounts = (timeStamps: TimeStamp, confidence: number): Record<string, Record<string, number>> => {
    const VideoTagCounts: Record<string, Record<string, number>> = {};
    for (const timeStep in timeStamps.frames) {
        const frameTagCounts = getImageTagCounts(timeStamps.frames[timeStep], confidence);
        VideoTagCounts[timeStep] = frameTagCounts;
    }

    return VideoTagCounts;
}

export const getVideoTagColours = (timeStamps: TimeStamp, confidence: number): Record<string, string> => {
    let tagColours: Record<string, string> = {};
    for (const timeStep in timeStamps.frames) {
        tagColours = { ...tagColours, ...getImageTagColours(timeStamps.frames[timeStep], confidence) }
    }
    return tagColours;
}